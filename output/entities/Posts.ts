import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comments } from "./Comments";
import { Users } from "./Users";

@Index("posts_pkey", ["id"], { unique: true })
@Entity("posts", { schema: "public" })
export class Posts {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "post", nullable: true, length: 255 })
  post: string | null;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];

  @ManyToOne(() => Users, (users) => users.posts)
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
