import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postService;
    constructor(postService: PostsService);
    getPosts(): Promise<import("./posts.interface").PostInterface[]>;
    createPost(post: string, req: any): Promise<any>;
    getPostById(id: number): Promise<{
        result: {
            id: number;
            post: string;
            updatedAt: Date;
            user: {
                id: number;
                username: string;
            };
        };
    }>;
    createComment(comment: string, req: any, postId: number): Promise<any>;
}
