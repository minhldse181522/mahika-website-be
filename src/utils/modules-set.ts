import { ApiModule } from '@/api/api.module';
// import authConfig from '@/api/auth/config/auth.config';
import { BackgroundModule } from '@/background/background.module';
import appConfig from '@/config/app.config';
import { AllConfigType } from '@/config/config.type';
import databaseConfig from '@/database/config/database.config';
import { TypeOrmConfigService } from '@/database/typeorm-config.service';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-ioredis-yet';
import { LoggerModule } from 'nestjs-pino';
import { DataSource, DataSourceOptions } from 'typeorm';
import loggerFactory from './logger-factory';

function generateModulesSet() {
  const imports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, /* authConfig */],
      envFilePath: ['.env'],
    }),
  ];
  let customModules: ModuleMetadata['imports'] = [];

  const dbModule = TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
    dataSourceFactory: async (options: DataSourceOptions) => {
      if (!options) {
        throw new Error('Invalid options passed');
      }

      return new DataSource(options).initialize();
    },
  });

  // const i18nModule = I18nModule.forRootAsync({
  //   resolvers: [
  //     { use: QueryResolver, options: ['lang'] },
  //     AcceptLanguageResolver,
  //     new HeaderResolver(['x-lang']),
  //   ],
  //   useFactory: (configService: ConfigService<AllConfigType>) => {
  //     const env = configService.get('app.nodeEnv', { infer: true });
  //     const isLocal = env === Environment.LOCAL;
  //     const isDevelopment = env === Environment.DEVELOPMENT;
  //     return {
  //       fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
  //         infer: true,
  //       }),
  //       loaderOptions: {
  //         path: path.join(__dirname, '/../i18n/'),
  //         watch: isLocal,
  //       },
  //       typesOutputPath: path.join(
  //         __dirname,
  //         '../../src/generated/i18n.generated.ts',
  //       ),
  //       logging: isLocal || isDevelopment, // log info on missing keys
  //     };
  //   },
  //   inject: [ConfigService],
  // });

  const loggerModule = LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: loggerFactory,
  });

  const modulesSet = process.env.MODULES_SET || 'monolith';

  switch (modulesSet) {
    case 'monolith':
      customModules = [
        ApiModule,
        BackgroundModule,
        dbModule,
        loggerModule,
      ];
      break;
    case 'api':
      customModules = [
        ApiModule,
        dbModule,
        loggerModule,
      ];
      break;
    case 'background':
      customModules = [
        BackgroundModule,
        dbModule,
        loggerModule,
      ];
      break;
    default:
      console.error(`Unsupported modules set: ${modulesSet}`);
      break;
  }

  return imports.concat(customModules);
}

export default generateModulesSet;
