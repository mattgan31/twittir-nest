import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './users/users.service';
import { UserController } from './users/users.controller';
import { UploadMulter } from './multer/multer';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalGuard } from './auth/local/local.guard';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { JwtGuard } from './auth/jwt/jwt.guard';
import { RelationshipController } from './relationship/relationship.controller';
import { RelationshipService } from './relationship/relationship.service';

@Module({
  imports: [
    MulterModule.register(UploadMulter.MulterOption()),
    PassportModule,
    JwtModule.register({
      secret: 's3kret',
      signOptions: {
        expiresIn: '2d',
      },
    }),
  ],
  controllers: [UserController, PostsController, RelationshipController],
  providers: [
    PrismaService,
    UserService,
    PostsService,
    RelationshipService,
    UploadMulter,
    LocalGuard,
    JwtGuard,
  ],
})
export class AppModule { }
