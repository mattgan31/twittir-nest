import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getPosts() {
    return this.postService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async createPost(@Body('post') post: string, @Request() req: any) {
    const { user } = req;
    return this.postService.createPost(post, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public async getPostById(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  // Comment session
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/comment')
  public async createComment(
    @Body('description') comment: string,
    @Request() req: any,
    @Param('id') postId: number,
  ) {
    const { user } = req;
    return this.postService.createComment(comment, user, postId);
  }
}
