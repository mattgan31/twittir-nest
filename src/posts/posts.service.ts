import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../output/entities/Posts';
import { Repository } from 'typeorm';
import { PostInterface } from './posts.interface';
import { Comments } from 'output/entities/Comments';
import { CommentInterface } from './comments/comments.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postService: Repository<Posts>,
    @InjectRepository(Comments) private commentService: Repository<Comments>,
  ) { }

  public async findAll(): Promise<{ posts: PostInterface[] }> {
    const posts = await this.postService.find({
      relations: ['user', 'comment', 'comment.user'],
      order: {
        createdAt: 'DESC',
      },
    });

    const formattedPosts: PostInterface[] = posts.map((post) => {
      const comments: CommentInterface[] =
        Array.isArray(post.comment) && post.comment.length > 0
          ? post.comment.map((comment) => ({
            id: comment.id,
            description: comment.description,
            userId: comment.userId,
            postId: comment.postId,
            createdAt: comment.createdAt,
            user_comment: {
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
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newPost;
    } catch (error) {
      return error.message;
    }
  }

  public async getPostById(id: number): Promise<{ posts: PostInterface }> {
    const post = await this.postService.findOne({
      where: [{ id: id }],
      relations: ['user', 'comment', 'comment.user'],
    });

    if (!post) {
      throw new NotFoundException('Data post not found');
    }

    let comments: CommentInterface[] = [];
    if (Array.isArray(post.comment)) {
      comments = post.comment.map((comment) => ({
        id: comment.id,
        description: comment.description,
        userId: comment.userId,
        postId: comment.postId,
        createdAt: comment.createdAt,
        user_comment: {
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
