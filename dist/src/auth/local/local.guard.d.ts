import { Strategy } from 'passport-local';
import { UserService } from '../../users/users.service';
declare const LocalGuard_base: new (...args: any[]) => Strategy;
export declare class LocalGuard extends LocalGuard_base {
    private authService;
    constructor(authService: UserService);
    validate(username: string, password: string): Promise<{
        id: number;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        posts: import("../../../output/entities/Posts").Posts[];
        comment: import("../../../output/entities/Comments").Comments;
    }>;
}
export {};
