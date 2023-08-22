import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relationships } from 'output/entities/Relationships';
import { Repository } from 'typeorm';

@Injectable()
export class RelationshipService {
    constructor(
        @InjectRepository(Relationships) private relationshipRepo: Repository<Relationships>,
    ) { }

    public async followUser(user_id: number, user: any) {
        const mineUserId = user.id;
        const otherUserId = user_id;

        const isMineFollowingThisUser = await this.relationshipRepo.findOne({ where: { followerId: mineUserId, followingId: otherUserId } })
        if (!isMineFollowingThisUser) {
            const relationship = new Relationships();
            relationship.followerId = mineUserId;
            relationship.followingId = otherUserId;
            relationship.createdAt = new Date();
            relationship.updatedAt = new Date();
            await this.relationshipRepo.save(relationship);

            return {
                message: `You are followed ${otherUserId}`
            }
        } else {
            await this.relationshipRepo.delete({ followerId: mineUserId, followingId: otherUserId })
            return {
                message: `You are unfollow ${otherUserId}`
            }
        }
    }
}
