import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';
import { Comments } from './Comments';

@Index('posts_pkey', ['id'], { unique: true })
@Entity('posts', { schema: 'public' })
export class Posts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'userId', nullable: false })
  userId: number | null;

  @Column('character varying', { name: 'post', nullable: false, length: 255 })
  post: string | null;

  // @Column('timestamp with time zone', { name: 'createdAt' })
  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'createdAt',
    nullable: true,
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updatedAt',
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @OneToMany(() => Comments, (comment) => comment.post)
  comment: Comments;
}
