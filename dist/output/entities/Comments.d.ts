import { Posts } from './Posts';
import { Users } from './Users';
export declare class Comments {
    id: number;
    userId: number | false;
    postId: number | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    post: Posts;
    user: Users;
}
