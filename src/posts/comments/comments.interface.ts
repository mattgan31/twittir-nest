import { CommentUserInterface } from './commentUser.interface';

export interface CommentInterface {
    id: number;
    description: string;
    createdAt: Date;
    user: CommentUserInterface;
}
