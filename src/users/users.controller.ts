import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

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
}
