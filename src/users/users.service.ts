import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
  ) { }

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

  public async register(user: any) {

    if (!user.password || !user.username) {
      throw new BadRequestException("Username or Password is required")
    }

    const isUserAvailable = await this.userRepo.findOne({ where: { username: user.username } })

    if (isUserAvailable) {
      throw new ConflictException("Username is unavailable")
    }

    const hashPassword = await Bcrypt.hash(user.password, 10);

    const newUser = await this.userRepo.save({
      username: user.username,
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { ...result } = newUser
    return result;

  }
}
