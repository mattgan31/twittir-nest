import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../output/entities/Posts';
import { In, Repository } from 'typeorm';
import { PostInterface } from './posts.interface';
import { Comments } from 'output/entities/Comments';
import { CommentInterface } from './comments/comments.interface';
import { Relationships } from 'output/entities/Relationships';
import { LikesInterface } from './likes/likes.interface';
import { Likes } from 'output/entities/Likes';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postService: Repository<Posts>,
    @InjectRepository(Comments) private commentService: Repository<Comments>,
    @InjectRepository(Relationships) private relationshipService: Repository<Relationships>,
    @InjectRepository(Likes) private likeService: Repository<Likes>,
  ) { }

  public async findAll(): Promise<{ posts: PostInterface[] }> {
    try {
      const posts = await this.postService.find({
        relations: {
          user: true,
          comments: { user: true, likes: { user: true } },
          likes: { user: true }
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (!posts) {
        throw new NotFoundException("Posts is not available")
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
              },
              // Check if comment has likes
              ...(comment.likes && comment.likes.length > 0 && {
                likes: comment.likes.map((like) => ({
                  id: like.id,
                  user: {
                    id: like.user.id,
                    username: like.user.username
                  }
                }))
              }),
            }))
            : [];

        const likes: LikesInterface[] =
          post.likes && post.likes.length > 0 ?
            post.likes.map((like) => ({
              id: like.id,
              user: {
                id: like.user.id,
                username: like.user.username
              }
            })) : []

        return {
          id: post.id,
          post: post.post,
          createdAt: post.createdAt,
          user: {
            id: post.user.id,
            username: post.user.username,
          },
          likes,
          comments,
          // Add other properties from the related entity as needed
          // For example: likes: post.likes,
        };
      });


      return { posts: formattedPosts };

    } catch (error) {
      throw error;
    }
  }

  public async createPost(post: string, user: any) {
    try {

      const newPost = await this.postService.save({
        post,
        user,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return newPost;
    } catch (error) {
      throw error;
    }
  }

  public async getPostById(id: number): Promise<{ posts: PostInterface }> {
    try {
      const post = await this.postService.findOne({
        where: [{ id }],
        relations: {
          user: true,
          comments: { user: true, likes: { user: true } },
          likes: { user: true }
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
            username: comment.user.username,
          },
          ...(comment.likes && comment.likes.length > 0 && {
            likes: comment.likes.map((like) => ({
              id: like.id,
              user: {
                id: like.user.id,
                username: like.user.username
              }
            }))
          }),
        }));
      }

      const likes: LikesInterface[] =
        post.likes && post.likes.length > 0 ?
          post.likes.map((like) => ({
            id: like.id,
            user: {
              id: like.user.id,
              username: like.user.username
            }
          })) : []

      const postWithFormattedComments: PostInterface = {
        id: post.id,
        post: post.post,
        createdAt: post.createdAt,
        user: {
          id: post.user.id,
          username: post.user.username,
        },
        comments,
        likes,
      };

      return { posts: postWithFormattedComments };
    } catch (error) {
      throw error;
    }
  }

  public async getPostByUserId(userId: number) {
    try {
      const posts = await this.postService.find({
        where: { user: { id: userId } },
        relations: {
          user: true,
          comments: { user: true, likes: { user: true } },
          likes: { user: true }
        },
        order: {
          createdAt: 'DESC',
        },
      });

      if (!posts) {
        throw new NotFoundException("Posts is not available")
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
              },
              // Check if comment has likes
              ...(comment.likes && comment.likes.length > 0 && {
                likes: comment.likes.map((like) => ({
                  id: like.id,
                  user: {
                    id: like.user.id,
                    username: like.user.username
                  }
                }))
              }),
            }))
            : [];

        const likes: LikesInterface[] =
          post.likes && post.likes.length > 0 ?
            post.likes.map((like) => ({
              id: like.id,
              user: {
                id: like.user.id,
                username: like.user.username
              }
            })) : []

        return {
          id: post.id,
          post: post.post,
          createdAt: post.createdAt,
          user: {
            id: post.user.id,
            username: post.user.username,
          },
          likes,
          comments,
          // Add other properties from the related entity as needed
          // For example: likes: post.likes,
        };
      });


      return { posts: formattedPosts };

    } catch (error) {
      throw error;
    }
  }

  // HERE IS BUG
  public async getPostFollowedByUser(user: any): Promise<{ posts: PostInterface[] }> {
    try {
      const followedUsers = await this.relationshipService.find({
        where: { follower: user },
        relations: { following: true },
      });

      if (followedUsers.length < 1) {
        throw new NotFoundException("You are not following anyone");
      }

      const userIds = followedUsers.map((item) => item.following.id);

      const posts = await this.postService.find({
        where: { user: { id: In(userIds) } },
        relations: {
          user: true,
          comments: { user: true, likes: { user: true } },
          likes: { user: true }
        },
        order: { createdAt: 'DESC' }
      })

      if (!posts) {
        throw new NotFoundException("Posts is not available")
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
              },
              // Check if comment has likes
              ...(comment.likes && comment.likes.length > 0 && {
                likes: comment.likes.map((like) => ({
                  id: like.id,
                  user: {
                    id: like.user.id,
                    username: like.user.username
                  }
                }))
              }),
            }))
            : [];

        const likes: LikesInterface[] =
          post.likes && post.likes.length > 0 ?
            post.likes.map((like) => ({
              id: like.id,
              user: {
                id: like.user.id,
                username: like.user.username
              }
            })) : []

        return {
          id: post.id,
          post: post.post,
          createdAt: post.createdAt,
          user: {
            id: post.user.id,
            username: post.user.username,
          },
          likes,
          comments,
          // Add other properties from the related entity as needed
          // For example: likes: post.likes,
        };
      });


      return { posts: formattedPosts };
    } catch (error) {
      throw error;
    }
  }

  // Comment session
  public async createComment(comment: string, user: any, postId: number) {
    const post = await this.postService.findOne({ where: { id: postId } })
    try {
      const newComment = await this.commentService.save({
        post,
        description: comment,
        user,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newComment;
    } catch (error) {
      throw error;
    }
  }

  // Like Session
  public async likePost(user: any, postId: number) {
    try {
      const post = await this.postService.findOne({ where: { id: postId } })
      if (!post) {
        throw new NotFoundException("The post want you to like is not found")
      }

      const postIsLikedByUser = await this.likeService.findOne({ where: { user, post } });

      if (!postIsLikedByUser) {
        await this.likeService.save({
          post,
          user
        });

        return {
          message: `You are liked post with ${post.id} ID`
        }
      } else {
        await this.likeService.delete({
          post,
          user
        });

        return {
          message: `You are unlike post with ${post.id} ID`
        }
      }

    } catch (error) {
      throw error;
    }
  }

  public async likeComment(user: any, commentId: number) {
    try {
      const comment = await this.commentService.findOne({ where: { id: commentId } })
      if (!comment) {
        throw new NotFoundException("The comment want you to like is not found")
      }

      const postIsLikedByUser = await this.likeService.findOne({ where: { user, comment } });

      if (!postIsLikedByUser) {
        await this.likeService.save({
          comment,
          user
        });

        return {
          message: `You are liked comment with ${comment.id} ID`
        }
      } else {
        await this.likeService.delete({
          comment,
          user
        });

        return {
          message: `You are unlike comment with ${comment.id} ID`
        }
      }

    } catch (error) {
      throw error;
    }
  }
}
