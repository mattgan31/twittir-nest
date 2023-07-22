import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../output/entities/Users';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOne({
      where: [{ username: username }],
    });
    const compare = await Bcrypt.compare(password, user.password);
    if (compare) {
      const { ...result } = user;
      return result;
    }
  }

  public async signin(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async getUserById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (user) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
