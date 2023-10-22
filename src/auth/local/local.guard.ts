import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../users/users.service';

@Injectable()
export class LocalGuard extends PassportStrategy(Strategy) {
  constructor(private authService: UserService) {
    super();
  }
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }
}
