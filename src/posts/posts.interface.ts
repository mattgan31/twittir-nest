import { UsersInterface } from '../users/users.interface';

export interface PostInterface {
  id: number;
  post: string;
  updatedAt: Date;
  user: UsersInterface;
}
