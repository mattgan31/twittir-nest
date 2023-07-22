import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../output/entities/Posts';
import { Repository } from 'typeorm';
import { PostInterface } from './posts.interface';
import { Comments } from 'output/entities/Comments';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postService: Repository<Posts>,
    @InjectRepository(Comments) private commentService: Repository<Comments>,
  ) {}

  public async findAll(): Promise<PostInterface[]> {
    const posts = await this.postService.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });

    // Map the Posts entities to the PostInterface
    return posts.map((post) => ({
      id: post.id,
      post: post.post,
      updatedAt: post.updatedAt,
      user: {
        id: post.user.id,
        username: post.user.username,
      },
      // Add other properties from the related entity as needed
      // For example: user: post.user,
    }));
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

  public async getPostById(id: number) {
    const post = await this.postService.findOne({
      where: [
        {
          id: id,
        },
      ],
      relations: ['user', 'comment', 'comment.user'],
    });

    return {
      result: {
        id: post.id,
        post: post.post,
        updatedAt: post.updatedAt,
        user: {
          id: post.user.id,
          username: post.user.username,
        },
        // Add other properties from the related entity as needed
        // For example: user: post.user,
      },
    };
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
