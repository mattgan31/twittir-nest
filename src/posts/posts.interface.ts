import { UsersInterface } from '../users/users.interface';
import { CommentInterface } from './comments/comments.interface';
import { LikesInterface } from './likes/likes.interface';

export interface PostInterface {
  id: number;
  post: string;
  createdAt: Date;
  user: UsersInterface;
  likes: LikesInterface[];
  comments: CommentInterface[];
}
