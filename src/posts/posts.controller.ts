import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller('api')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    @InjectRedis() private readonly redis: Redis,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts')
  public async getPosts() {
    try {
      const redisData = await this.redis.get('posts:all')

      if (redisData) {
        return { data: JSON.parse(redisData) };
      } else {
        const data = await this.postService.findAll();

        const jsonString = JSON.stringify(data.data)
        await this.redis.set('posts:all', jsonString)
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('posts')
  public async createPost(@Body('post') post: string, @Request() req: any) {
    const { user } = req;
    return this.postService.createPost(post, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts/followed')
  public async getPostFollowedByUser(@Req() req: any) {

    const redisData = await this.redis.get(`posts:followed_user:${req.user.id}`)

    if (redisData) {
      return { data: JSON.parse(redisData) };
    } else {
      const data = await this.postService.getPostFollowedByUser(req.user);

      const jsonString = JSON.stringify(data.data)
      await this.redis.set(`posts:followed_user:${req.user.id}`, jsonString)
      return data;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts/:id')
  public async getPostById(@Param('id', ParseIntPipe) id: number) {
    const redisData = await this.redis.get(`post:${id}`)

    if (redisData) {
      return { data: JSON.parse(redisData) };
    } else {
      const data = await this.postService.getPostById(id);

      const jsonString = JSON.stringify(data.data)
      await this.redis.set(`post:${id}`, jsonString)
      return data;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('posts/:id')
  public async deletePostById(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.postService.deletePostById(id, user);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('posts/user/:id')
  public async getPostByUserId(@Param('id', ParseIntPipe) id: number) {

    const redisData = await this.redis.get(`posts:user:${id}`)

    if (redisData) {
      return { data: JSON.parse(redisData) };
    } else {
      const data = await this.postService.getPostByUserId(id);

      const jsonString = JSON.stringify(data.data)
      await this.redis.set(`posts:user:${id}`, jsonString)
      return data;
    }
  }

  // Comment session
  @UseGuards(AuthGuard('jwt'))
  @Post('posts/:id/comment')
  public async createComment(
    @Body('description') comment: string,
    @Request() req: any,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    const { user } = req;
    return this.postService.createComment(comment, user, postId);
  }

  // Like Session
  @UseGuards(AuthGuard('jwt'))
  @Post('posts/:id/like')
  public async likePost(
    @Param('id', ParseIntPipe) postId: number,
    @Request() req: any,
  ) {
    const { user } = req;
    return this.postService.likePost(user, postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('comments/:id/like')
  public async likeComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Request() req: any,
  ) {
    const { user } = req;
    return this.postService.likeComment(user, commentId);
  }


}
