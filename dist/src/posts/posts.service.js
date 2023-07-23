"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Posts_1 = require("../../output/entities/Posts");
const typeorm_2 = require("typeorm");
const Comments_1 = require("../../output/entities/Comments");
let PostsService = exports.PostsService = class PostsService {
    constructor(postService, commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }
    async findAll() {
        const posts = await this.postService.find({
            relations: ['user', 'comment', 'comment.user'],
            order: {
                createdAt: 'DESC',
            },
        });
        const formattedPosts = posts.map((post) => {
            const comments = Array.isArray(post.comment) && post.comment.length > 0
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
            };
        });
        return { posts: formattedPosts };
    }
    async createPost(post, user) {
        try {
            const newPost = await this.postService.save({
                post,
                userId: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return newPost;
        }
        catch (error) {
            return error.message;
        }
    }
    async getPostById(id) {
        const post = await this.postService.findOne({
            where: [{ id: id }],
            relations: ['user', 'comment', 'comment.user'],
        });
        if (!post) {
            throw new common_1.NotFoundException('Data post not found');
        }
        let comments = [];
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
        const postWithFormattedComments = {
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
    async createComment(comment, user, postId) {
        try {
            const newComment = await this.commentService.save({
                postId,
                description: comment,
                userId: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return newComment;
        }
        catch (error) {
            return error.message;
        }
    }
};
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Posts_1.Posts)),
    __param(1, (0, typeorm_1.InjectRepository)(Comments_1.Comments)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map