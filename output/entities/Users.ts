import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './Posts';
import { Comments } from './Comments';

@Index('users_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    name: 'username',
    nullable: true,
    length: 255,
  })
  username: string | null;

  @Column('character varying', {
    name: 'password',
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column('timestamp with time zone', { name: 'createdAt' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comment: Comments;
}
