import { UserService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signIn(req: any): Promise<{
        token: string;
    }>;
    getProfile(req: any): Promise<any>;
    getUserById(id: number): Promise<{
        id: number;
        username: string;
        createdAt: Date;
        updatedAt: Date;
        posts: import("../../output/entities/Posts").Posts[];
        comment: import("../../output/entities/Comments").Comments;
    }>;
}
