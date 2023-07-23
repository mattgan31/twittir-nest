import { Posts } from '../../output/entities/Posts';
import { Repository } from 'typeorm';
import { PostInterface } from './posts.interface';
import { Comments } from 'output/entities/Comments';
export declare class PostsService {
    private postService;
    private commentService;
    constructor(postService: Repository<Posts>, commentService: Repository<Comments>);
    findAll(): Promise<{
        posts: PostInterface[];
    }>;
    createPost(post: string, user: any): Promise<any>;
    getPostById(id: number): Promise<{
        posts: PostInterface;
    }>;
    createComment(comment: string, user: any, postId: number): Promise<any>;
}
