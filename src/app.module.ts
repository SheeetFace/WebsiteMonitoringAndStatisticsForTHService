import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteStatusModule } from './site-status/site-status.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';

@Module({
  imports: [SiteStatusModule,
            ConfigModule.forRoot({isGlobal:true}),
            TypeOrmModule.forRootAsync({
              imports:[ConfigModule],
              useFactory:(configService:ConfigService)=>({
                type:'postgres',
                host:configService.get('DB_HOST'),
                port:configService.get('DB_PORT'),
                username:configService.get('DB_USERNAME'),
                password:configService.get('DB_PASSWORD'),
                database:configService.get('DB_NAME'),
                // ssl: { rejectUnauthorized: false },
                ssl: {
                  ca: fs.readFileSync('ca.pem')
                },
                synchronize:true,
                entities:[__dirname + '/**/*.entity{.js,.ts}']
              }),
              inject:[ConfigService]
            })
  ],
  controllers: [AppController], //контроллер - это роуты
  providers: [AppService],      //логика роута
})
export class AppModule {}
