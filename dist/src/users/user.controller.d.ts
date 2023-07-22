import { UserService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signIn(req: any): Promise<{
        token: string;
    }>;
    getUserById(id: number): Promise<import("../../output/entities/Users").Users>;
}
