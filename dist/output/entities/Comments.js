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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const typeorm_1 = require("typeorm");
const Posts_1 = require("./Posts");
const Users_1 = require("./Users");
let Comments = exports.Comments = class Comments {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Comments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'userId', nullable: true }),
    __metadata("design:type", Object)
], Comments.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'postId', nullable: false }),
    __metadata("design:type", Number)
], Comments.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'description',
        nullable: false,
        length: 255,
    }),
    __metadata("design:type", String)
], Comments.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { name: 'createdAt' }),
    __metadata("design:type", Date)
], Comments.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { name: 'updatedAt' }),
    __metadata("design:type", Date)
], Comments.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Posts_1.Posts, (post) => post.comment),
    __metadata("design:type", Posts_1.Posts)
], Comments.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (user) => user.posts),
    __metadata("design:type", Users_1.Users)
], Comments.prototype, "user", void 0);
exports.Comments = Comments = __decorate([
    (0, typeorm_1.Index)('comments_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('comments', { schema: 'public' })
], Comments);
//# sourceMappingURL=Comments.js.map