import { Posts } from './Posts';
import { Comments } from './Comments';
export declare class Users {
    id: number;
    username: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    posts: Posts[];
    comment: Comments;
}
