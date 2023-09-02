import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadMulter } from 'src/multer/multer';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async signIn(@Request() req: any) {
    return this.userService.signin(req.user);
  }

  @Post('register')
  public async register(@Body() user: any) {
    return this.userService.register(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users/profile')
  public async getProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users/:id')
  public async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('search')
  public async searchUser(@Query('username') username: string) {
    return this.userService.getListUser(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', { storage: UploadMulter.MulterOption().storage }))
  @Put('users/picture')
  public async updateProfilePicture(@UploadedFile() picture: any, @Request() req: any) {
    return this.userService.updateProfilePicture(picture, req);
  }
}
