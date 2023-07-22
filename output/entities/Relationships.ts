import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('relationships_pkey', ['id'], { unique: true })
@Entity('relationships', { schema: 'public' })
export class Relationships {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'followerId', nullable: true })
  followerId: number | null;

  @Column('integer', { name: 'followingId', nullable: true })
  followingId: number | null;

  // @Column('timestamp with time zone', { name: 'createdAt' })
  @CreateDateColumn()
  createdAt: Date;

  // @Column('timestamp with time zone', { name: 'updatedAt' })
  @UpdateDateColumn()
  updatedAt: Date;
}
