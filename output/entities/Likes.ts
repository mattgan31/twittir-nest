import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comments } from "./Comments";
import { Posts } from "./Posts";
import { Users } from "./Users";

@Entity("likes", { schema: "public" })
export class Likes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", { name: "createdAt", nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => Comments, (comments) => comments.likes)
  @JoinColumn([{ name: "commentId", referencedColumnName: "id" }])
  comment: Comments;

  @ManyToOne(() => Posts, (posts) => posts.likes)
  @JoinColumn([{ name: "postId", referencedColumnName: "id" }])
  post: Posts;

  @ManyToOne(() => Users, (users) => users.likes)
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
