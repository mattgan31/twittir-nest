import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RelationshipService {
    constructor(
        private prisma: PrismaService,
    ) { }

    public async followUser(userId: number, user: any) {
        const mineUser = await this.prisma.user.findUnique({ where: { id: user.id } });
        const otherUser = await this.prisma.user.findUnique({ where: { id: userId } });

        try {

            if (!otherUser) {
                throw new NotFoundException(`User with ID ${userId} is not found`)
            }

            if (userId === user.id) {
                throw new ForbiddenException("You cannot follow yourself")
            }

            const isMineFollowingThisUser = await this.prisma.relationship.findFirst({
                where: {
                    follower: mineUser,
                    following: otherUser
                }
            })
            if (!isMineFollowingThisUser) {
                await this.prisma.relationship.create({
                    data: {
                        followerId: mineUser.id,
                        followingId: otherUser.id
                    }
                });

                return {
                    message: `You are followed ${otherUser.username}`
                }
            } else if (isMineFollowingThisUser.deleted === false) {
                await this.prisma.relationship.updateMany({ data: { deleted: true }, where: { followerId: mineUser.id, followingId: otherUser.id } })
                return {
                    message: `You are unfollowed ${otherUser.username}`
                }
            } else if (isMineFollowingThisUser.deleted === true) {
                await this.prisma.relationship.updateMany({ data: { deleted: false }, where: { followerId: mineUser.id, followingId: otherUser.id } })
                return {
                    message: `You are followed ${otherUser.username}`
                }
            }


        } catch (error) {
            return error.response;
        }

    }
}
