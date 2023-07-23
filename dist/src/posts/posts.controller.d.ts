import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postService;
    constructor(postService: PostsService);
    getPosts(): Promise<{
        posts: import("./posts.interface").PostInterface[];
    }>;
    createPost(post: string, req: any): Promise<any>;
    getPostById(id: number): Promise<{
        posts: import("./posts.interface").PostInterface;
    }>;
    createComment(comment: string, req: any, postId: number): Promise<any>;
}
