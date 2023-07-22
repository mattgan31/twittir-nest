import { JwtService } from '@nestjs/jwt';
import { Users } from '../../output/entities/Users';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<Users>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        id: number;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        posts: import("../../output/entities/Posts").Posts[];
        comment: import("../../output/entities/Comments").Comments;
    }>;
    signin(user: any): Promise<{
        token: string;
    }>;
    getUserById(id: number): Promise<Users>;
}
