import { CommentUserInterface } from './commentUser.interface';
export interface CommentInterface {
    id: number;
    description: string;
    userId: number;
    postId: number;
    createdAt: Date;
    user_comment: CommentUserInterface;
}
