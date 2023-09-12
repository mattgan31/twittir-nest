import { LikesInterface } from '../likes/likes.interface';
import { CommentUserInterface } from './commentUser.interface';

export interface CommentInterface {
    id: number;
    description: string;
    createdAt: Date;
    user: CommentUserInterface;
    likes: LikesInterface[];
}
