import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Posts } from "./Posts";
import { Users } from "./Users";
import { Likes } from "./Likes";

@Index("comments_pkey", ["id"], { unique: true })
@Entity("comments", { schema: "public" })
export class Comments {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(() => Posts, (posts) => posts.comments)
  @JoinColumn([{ name: "postId", referencedColumnName: "id" }])
  post: Posts;

  @ManyToOne(() => Users, (users) => users.comments)
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Likes, (likes) => likes.comment)
  likes: Likes[];
}
