import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../output/entities/Posts';
import { Repository } from 'typeorm';
import { PostInterface } from './posts.interface';
import { Comments } from 'output/entities/Comments';
import { CommentInterface } from './comments/comments.interface';
import { Relationships } from 'output/entities/Relationships';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postService: Repository<Posts>,
    @InjectRepository(Comments) private commentService: Repository<Comments>,
    @InjectRepository(Relationships) private relationshipService: Repository<Relationships>
  ) { }

  public async findAll(): Promise<{ posts: PostInterface[] }> {
    const posts = await this.postService.find({
      relations: {
        user: true,
        comments: { user: true }
      },
      order: {
        createdAt: 'DESC',
      },
    });

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
          }))
          : [];

      return {
        id: post.id,
        post: post.post,
        createdAt: post.createdAt,
        user: {
          id: post.user.id,
          username: post.user.username,
        },
        comments: comments,
        // Add other properties from the related entity as needed
        // For example: user: post.user,
      };
    });

    return { posts: formattedPosts };
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
      return error.message;
    }
  }

  public async getPostById(id: number): Promise<{ posts: PostInterface }> {
    const post = await this.postService.findOne({
      where: [{ id: id }],
      relations: {
        user: true,
        comments: { user: true }
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
      }));
    }

    const postWithFormattedComments: PostInterface = {
      id: post.id,
      post: post.post,
      createdAt: post.createdAt,
      user: {
        id: post.user.id,
        username: post.user.username,
      },
      comments: comments,
    };

    return { posts: postWithFormattedComments };
  }

  public async getPostFollowedByUser(user: any): Promise<{ posts: PostInterface[] }> {

    try {
      const followedUsers = await this.relationshipService.find({
        where: { follower: user },
        relations: { following: true }
      });

      if (followedUsers.length < 1) {
        throw new NotFoundException("You are not following anyone")
      }

      const userIds = followedUsers.map((item) => (
        item.following.id
      ))

      const posts = await this.postService.createQueryBuilder('posts')
        .select([
          'posts.id AS "id"',
          'posts.post AS "post"',
          'posts.createdAt AS "createdAt"',
          'user.id AS "userId"',
          'user.username AS "userUsername"',
          'comments.id AS "commentId"',
          'comments.description AS "commentDescription"',
          'comments.createdAt AS "commentCreatedAt"',
          'commentUser.id AS "commentUserId"',
          'commentUser.username AS "commentUserUsername"',
        ])
        .leftJoin('posts.user', 'user')
        .leftJoin('posts.comments', 'comments')
        .leftJoin('comments.user', 'commentUser')
        .where('user.id IN (:...userIds)', { userIds })
        .orderBy('posts.createdAt', 'DESC')
        .getRawMany();

      const transformedPosts: PostInterface[] = []
      let currentPosts: PostInterface | undefined = undefined;

      for (const row of posts) {
        if (!currentPosts || currentPosts.id !== row.id) {
          currentPosts = {
            id: row.id,
            post: row.post,
            createdAt: row.createdAt,
            user: {
              id: row.userId,
              username: row.userUsername
            },
            comments: [],
          }
          transformedPosts.push(currentPosts);
        }

        if (row.commentId) {
          currentPosts.comments.push({
            id: row.commentId,
            description: row.commentDescription,
            createdAt: row.commentCreatedAt,
            user: {
              id: row.commentUserId,
              username: row.commentUserUsername
            }
          });
        }
      }

      return {
        posts: transformedPosts
      }
    } catch (error) {
      return error.response;
    }
  }

  // Comment session
  public async createComment(comment: string, user: any, postId: number) {
    try {
      const newComment = await this.commentService.save({
        postId,
        description: comment,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newComment;
    } catch (error) {
      return error.message;
    }
  }
}
