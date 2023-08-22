import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './global/global.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationshipController } from './relationship/relationship.controller';
import { RelationshipService } from './relationship/relationship.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'alam',
      database: 'catalog_express',
      entities: ['dist/output/entities/*.js'],
      autoLoadEntities: true,
    }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
