import { Module } from '@nestjs/common';
import { Users } from '../../output/entities/Users';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../users/users.service';
import { UserController } from '../users/users.controller';
import { PostsService } from '../../src/posts/posts.service';
import { PostsController } from '../../src/posts/posts.controller';
import { Posts } from '../../output/entities/Posts';
import { LocalGuard } from '../../src/auth/local/local.guard';
import { JwtGuard } from '../../src/auth/jwt/jwt.guard';
import { Comments } from 'output/entities/Comments';
import { RelationshipService } from 'src/relationship/relationship.service';
import { RelationshipController } from 'src/relationship/relationship.controller';
import { Relationships } from 'output/entities/Relationships';
import { Likes } from 'output/entities/Likes';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMulter } from 'src/multer/multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Users, Comments, Relationships, Likes]),
    MulterModule.register(UploadMulter.MulterOption()),
    PassportModule,
    JwtModule.register({
      secret: 's3kret',
      signOptions: {
        expiresIn: '2d',
      },
    }),
  ],
  providers: [PostsService, UserService, RelationshipService, LocalGuard, JwtGuard],
  controllers: [PostsController, UserController, RelationshipController],
  exports: [UserService],
})
export class GlobalModule { }
