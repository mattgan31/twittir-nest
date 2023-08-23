import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relationships } from 'output/entities/Relationships';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class RelationshipService {
    constructor(
        @InjectRepository(Relationships) private relationshipRepo: Repository<Relationships>,
        @InjectRepository(Users) private userRepo: Repository<Users>,
    ) { }

    public async followUser(user_id: number, user: any) {
        const mineUser = await this.userRepo.findOne({ where: { id: user.id } });
        const otherUser = await this.userRepo.findOne({ where: { id: user_id } });

        try {
            if (user_id === user.id) {
                throw new ForbiddenException("You cannot follow yourself")
            }

            const isMineFollowingThisUser = await this.relationshipRepo.findOne({
                where: {
                    follower: mineUser,
                    following: otherUser
                }
            })
            if (!isMineFollowingThisUser) {
                const relationship = new Relationships();
                relationship.follower = mineUser;
                relationship.following = otherUser;
                relationship.createdAt = new Date();
                relationship.updatedAt = new Date();
                await this.relationshipRepo.save(relationship);

                return {
                    message: `You are followed ${otherUser.username}`
                }
            } else {
                await this.relationshipRepo.delete({ follower: mineUser, following: otherUser })
                return {
                    message: `You are unfollow ${otherUser.username}`
                }
            }
        } catch (error) {
            return error.response;
        }

    }
}
