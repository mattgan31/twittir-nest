import { UsersInterface } from '../users/users.interface';
import { CommentInterface } from './comments/comments.interface';
export interface PostInterface {
    id: number;
    post: string;
    createdAt: Date;
    user: UsersInterface;
    comments: CommentInterface[];
}
