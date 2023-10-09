import {
  Body,
  Controller,
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

@Controller('api')
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts')
  public async getPosts() {
    return this.postService.findAll();
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
    return this.postService.getPostFollowedByUser(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts/:id')
  public async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts/user/:id')
  public async getPostByUserId(@Param('id') id: number) {
    return this.postService.getPostByUserId(id)
  }

  // Comment session
  @UseGuards(AuthGuard('jwt'))
  @Post('posts/:id/comment')
  public async createComment(
    @Body('description') comment: string,
    @Request() req: any,
    @Param('id') postId: number,
  ) {
    const { user } = req;
    return this.postService.createComment(comment, user, postId);
  }

  // Like Session
  @UseGuards(AuthGuard('jwt'))
  @Post('posts/:id/like')
  public async likePost(
    @Param('id') postId: number,
    @Request() req: any,
  ) {
    const { user } = req;
    return this.postService.likePost(user, postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('comments/:id/like')
  public async likeComment(
    @Param('id') commentId: number,
    @Request() req: any,
  ) {
    const { user } = req;
    return this.postService.likeComment(user, commentId);
  }


}
