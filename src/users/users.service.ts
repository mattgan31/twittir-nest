import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import { UserDto } from './user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  public async validateUser(username: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const compare = await Bcrypt.compare(password, user.password);
      if (compare) {
        const { ...result } = user;
        return result;
      }
    } catch (error) {
      console.log(error);
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
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (user) {
      const { password, ...result } = user;
      return { data: result };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  public async register(user: any) {
    if (!user.password || !user.username) {
      throw new BadRequestException('Username or Password is required');
    }

    const isUserAvailable = await this.prisma.user.findUnique({
      where: { username: user.username },
    });

    if (isUserAvailable) {
      throw new ConflictException('Username is unavailable');
    }

    const hashPassword = await Bcrypt.hash(user.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username: user.username,
        password: hashPassword,
        fullname: user.fullname,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const { ...result } = newUser;
    return { data: result };
  }

  public async getProfile(req: any) {
    const { user } = req;
    try {
      const profile = await this.prisma.user.findUnique({
        where: { id: user.id },
      });

      const { password, ...result } = profile;
      return { data: result };
    } catch (error) {
      return error.response;
    }
  }

  public async getListUser(search: string) {
    try {
      if (search === '') {
        const userList = [];

        return { users: userList };
      } else {
        const userList = await this.prisma.user.findMany({
          where: { username: { startsWith: search } },
        });

        const userDtos = userList.map((user: any) => {
          const userDto = new UserDto();
          userDto.id = user.id;
          userDto.username = user.username;
          userDto.profilePicture = user.profilePicture;

          return userDto;
        });
        return { data: userDtos };
      }
    } catch (error) {
      return error.response;
    }
  }

  public async updateProfilePicture(picture: any, req: any) {
    try {
      const { user } = req;
      const updateUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { profilePicture: picture.filename },
      });
      if (!updateUser) {
        throw new BadRequestException();
      }
      return updateUser;
    } catch (error) {
      return error.response;
    }
  }
}
