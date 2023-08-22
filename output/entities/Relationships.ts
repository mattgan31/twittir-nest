import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("relationships_pkey", ["id"], { unique: true })
@Entity("relationships", { schema: "public" })
export class Relationships {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp with time zone", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.relationships)
  @JoinColumn([{ name: "followerId", referencedColumnName: "id" }])
  follower: Users;

  @ManyToOne(() => Users, (users) => users.relationships2)
  @JoinColumn([{ name: "followingId", referencedColumnName: "id" }])
  following: Users;
}
