import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostInterface } from './posts.interface';
import { CommentInterface } from './comments/comments.interface';
import { LikesInterface } from './likes/likes.interface';
import { PrismaService } from '../prisma/prisma.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) { }

  // Private Function
  private async formattingPosts(posts: any) {
    const formattedPosts: PostInterface[] = posts.map((post: any) => {
      const comments: CommentInterface[] =
        post.comments && post.comments.length > 0
          ? post.comments.map((comment) => ({
            id: comment.id,
            description: comment.description,
            createdAt: comment.createdAt,
            user: {
              id: comment.user.id,
              username: comment.user.username,
              fullname: comment.user.fullname,
              profile_picture: comment.user.profilePicture,
            },
            // Check if comment has likes
            ...(comment.likes &&
              comment.likes.length > 0 && {
              likes: comment.likes.map((like) => ({
                id: like.id,
                user: {
                  id: like.user.id,
                  username: like.user.username,
                  profile_picture: like.user.profilePicture,
                },
              })),
            }),
          }))
          : [];

      const likes: LikesInterface[] =
        post.likes && post.likes.length > 0
          ? post.likes.map((like) => ({
            id: like.id,
            user: {
              id: like.user.id,
              username: like.user.username,
              profile_picture: like.user.profilePicture,
            },
          }))
          : [];

      return {
        id: post.id,
        post: post.post,
        createdAt: post.createdAt,
        user: {
          id: post.user.id,
          username: post.user.username,
          fullname: post.user.fullname,
          profile_picture: post.user.profilePicture,
        },
        likes,
        comments,
        // Add other properties from the related entity as needed
        // For example: likes: post.likes,
      };
    });
    return formattedPosts;
  }

  // Public Function

  public async findAll() {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          user: true,
          comments: {
            include: {
              user: true, likes: {
                include: { user: true },
                where: { deleted: false }
              }
            },
          },
          likes: {
            include: { user: true },
            where: { deleted: false }
          },
        }, where: { deleted: false },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!posts) {
        throw new NotFoundException('Posts is not available');
      }

      const formattedPosts = await this.formattingPosts(posts);

      return { data: formattedPosts };
    } catch (error) {
      throw error;
    }
  }

  public async createPost(post: string, user: any) {
    try {
      if (!post) {
        throw new ForbiddenException('Post is required');
      }

      const newPost = await this.prisma.post.create({
        data: {
          post,
          userId: user.id,
        },
        select: {
          id: true,
          post: true,
          createdAt: true,
          updatedAt: true,
          userId: true
        }
      });

      return { data: newPost };
    } catch (error) {
      throw error;
    }
  }

  public async getPostById(id: number): Promise<{ data: PostInterface }> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id, deleted: false },
        include: {
          user: true,
          comments: {
            include: { user: true, likes: { include: { user: true } } },
          },
          likes: { include: { user: true } },
        },
      });

      if (!post) {
        throw new NotFoundException('Data post not found');
      }

      let comments: CommentInterface[] = [];
      if (Array.isArray(post.comments)) {
        comments = post.comments.map((comment) => ({
          id: comment.id,
          description: comment.description,
          createdAt: comment.createdAt,
          user: {
            id: comment.user.id,
            fullname: comment.user.fullname,
            username: comment.user.username,
          },
          ...(comment.likes &&
            comment.likes.length > 0 && {
            likes: comment.likes.map((like) => ({
              id: like.id,
              user: {
                id: like.user.id,
                fullname: like.user.fullname,
                username: like.user.username,
                profile_picture: like.user.profilePicture,
              },
            })),
          }),
        }));
      }

      const likes: LikesInterface[] =
        post.likes && post.likes.length > 0
          ? post.likes.map((like) => ({
            id: like.id,
            user: {
              id: like.user.id,
              username: like.user.username,
              fullname: like.user.fullname,
              profile_picture: like.user.profilePicture,
            },
          }))
          : [];

      const postWithFormattedComments: PostInterface = {
        id: post.id,
        post: post.post,
        createdAt: post.createdAt,
        user: {
          id: post.user.id,
          username: post.user.username,
          fullname: post.user.fullname,
          profile_picture: post.user.profilePicture,
        },
        comments,
        likes,
      };

      return { data: postWithFormattedComments };
    } catch (error) {
      throw error;
    }
  }

  public async getPostByUserId(userId: number) {
    try {
      const posts = await this.prisma.post.findMany({
        where: { user: { id: userId }, deleted: false },
        include: {
          user: true,
          comments: {
            include: { user: true, likes: { include: { user: true } } },
          },
          likes: { include: { user: true } },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!posts) {
        throw new NotFoundException('Posts is not available');
      }

      const formattedPosts = await this.formattingPosts(posts);

      return { data: formattedPosts };
    } catch (error) {
      throw error;
    }
  }

  // HERE IS BUG
  public async getPostFollowedByUser(
    user: any,
  ): Promise<{ data: PostInterface[] }> {
    const { id: userId } = user;
    try {
      const followedUsers = await this.prisma.relationship.findMany({
        where: { followerId: userId, deleted: false },
        include: { following: true },
      });

      if (followedUsers.length < 1) {
        throw new NotFoundException('You are not following anyone');
      }

      const userIds = followedUsers.map((item) => item.following.id);

      const posts = await this.prisma.post.findMany({
        where: { user: { id: { in: userIds } } },
        include: {
          user: true,
          comments: {
            include: { user: true, likes: { include: { user: true } } },
          },
          likes: { include: { user: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (!posts) {
        throw new NotFoundException('Posts is not available');
      }

      const formattedPosts: PostInterface[] = posts.map((post) => {
        const comments: CommentInterface[] =
          post.comments && post.comments.length > 0
            ? post.comments.map((comment) => ({
              id: comment.id,
              description: comment.description,
              createdAt: comment.createdAt,
              user: {
                id: comment.user.id,
                username: comment.user.username,
                fullname: comment.user.fullname,
                profile_picture: comment.user.profilePicture,
              },
              // Check if comment has likes
              ...(comment.likes &&
                comment.likes.length > 0 && {
                likes: comment.likes.map((like) => ({
                  id: like.id,
                  user: {
                    id: like.user.id,
                    username: like.user.username,
                    fullname: like.user.fullname,
                    profile_picture: like.user.profilePicture,
                  },
                })),
              }),
            }))
            : [];

        const likes: LikesInterface[] =
          post.likes && post.likes.length > 0
            ? post.likes.map((like) => ({
              id: like.id,
              user: {
                id: like.user.id,
                username: like.user.username,
                fullname: like.user.fullname,
                profile_picture: like.user.profilePicture,
              },
            }))
            : [];

        return {
          id: post.id,
          post: post.post,
          createdAt: post.createdAt,
          user: {
            id: post.user.id,
            username: post.user.username,
            fullname: post.user.fullname,
            profile_picture: post.user.profilePicture,
          },
          likes,
          comments,
          // Add other properties from the related entity as needed
          // For example: likes: post.likes,
        };
      });

      return { data: formattedPosts };
    } catch (error) {
      throw error;
    }
  }

  public async deletePostById(postId: number) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id: postId, deleted: false } });

      if (!post) {
        throw new NotFoundException(`Post with id ${postId} is not found`)
      }

      const deletedPost = await this.prisma.post.update({ data: { deleted: true }, where: { id: postId } });

      await this.redis.del("AllPosts")
      await this.redis.del(`Post@${postId}`)
      return { message: 'Data is successfully deleted' };
    } catch (error) {
      throw error;
    }
  }


  // Comment session
  public async createComment(comment: string, user: any, postId: number) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id: postId } });

      if (!post) {
        throw new NotFoundException(`Post with id ${postId} is not found`)
      }

      const newComment = await this.prisma.comment.create({
        data: {
          postId,
          description: comment,
          userId: user.id,
        },
        select: {
          id: true,
          description: true,
          userId: true,
          postId: true,
          createdAt: true,
          updatedAt: true,
        }
      });
      return { data: newComment };
    } catch (error) {
      throw error;
    }
  }

  // Like Session
  public async likePost(user: any, postId: number) {
    const { id: userId } = user as { id: number };
    try {
      const post = await this.prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        throw new NotFoundException('The post want you to like is not found');
      }

      const postIsLikedByUser = await this.prisma.like.findFirst({
        where: { userId, postId },
      });

      if (!postIsLikedByUser) {
        await this.prisma.like.create({
          data: {
            postId,
            userId,
          },
        });

        return {
          message: `You are liked post with ${post.id} ID`,
        };
      } else if (postIsLikedByUser.deleted === false) {
        await this.prisma.like.updateMany({
          data: { deleted: true },
          where: {
            postId,
            userId,
          },
        });

        return {
          message: `You are unliked post with ${post.id} ID`,
        };
      } else if (postIsLikedByUser.deleted === true) {
        await this.prisma.like.updateMany({
          data: { deleted: false },
          where: {
            postId,
            userId,
          },
        });

        return {
          message: `You are liked post with ${post.id} ID`,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  public async likeComment(user: any, commentId: number) {
    const { id: userId } = user;
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!comment) {
        throw new NotFoundException(
          'The comment want you to like is not found',
        );
      }

      const commentIsLikedByUser = await this.prisma.like.findFirst({
        where: { userId: user.id, commentId },
      });

      if (!commentIsLikedByUser) {
        await this.prisma.like.create({
          data: {
            commentId,
            userId,
          },
        });

        return {
          message: `You are liked comment with ${comment.id} ID`,
        };
      } else if (commentIsLikedByUser.deleted === false) {
        await this.prisma.like.updateMany({
          data: { deleted: true },
          where: {
            commentId,
            userId,
          },
        });

        return {
          message: `You are unliked comment with ${comment.id} ID`,
        };
      } else if (commentIsLikedByUser.deleted === true) {
        await this.prisma.like.updateMany({
          data: { deleted: false },
          where: {
            commentId,
            userId,
          },
        });

        return {
          message: `You are liked comment with ${comment.id} ID`,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
