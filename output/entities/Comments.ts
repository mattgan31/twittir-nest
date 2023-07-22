import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './Posts';
import { Users } from './Users';

@Index('comments_pkey', ['id'], { unique: true })
@Entity('comments', { schema: 'public' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'userId', nullable: true })
  userId: number | false;

  @Column('integer', { name: 'postId', nullable: false })
  postId: number | null;

  @Column('character varying', {
    name: 'description',
    nullable: false,
    length: 255,
  })
  description: string | null;

  @Column('timestamp with time zone', { name: 'createdAt' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => Posts, (post) => post.comment)
  post: Posts;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;
}
