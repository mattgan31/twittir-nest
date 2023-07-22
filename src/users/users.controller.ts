import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async signIn(@Request() req: any) {
    return this.userService.signin(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
