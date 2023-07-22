import { Users } from './Users';
import { Comments } from './Comments';
export declare class Posts {
    id: number;
    userId: number | null;
    post: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: Users;
    comment: Comments;
}
