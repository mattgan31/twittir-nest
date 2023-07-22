"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalModule = void 0;
const common_1 = require("@nestjs/common");
const Users_1 = require("../../output/entities/Users");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("../users/users.service");
const users_controller_1 = require("../users/users.controller");
const posts_service_1 = require("../../src/posts/posts.service");
const posts_controller_1 = require("../../src/posts/posts.controller");
const Posts_1 = require("../../output/entities/Posts");
const local_guard_1 = require("../../src/auth/local/local.guard");
const jwt_guard_1 = require("../../src/auth/jwt/jwt.guard");
const Comments_1 = require("../../output/entities/Comments");
let GlobalModule = exports.GlobalModule = class GlobalModule {
};
exports.GlobalModule = GlobalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Posts_1.Posts, Users_1.Users, Comments_1.Comments]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 's3kret',
                signOptions: {
                    expiresIn: '2d',
                },
            }),
        ],
        providers: [posts_service_1.PostsService, users_service_1.UserService, local_guard_1.LocalGuard, jwt_guard_1.JwtGuard],
        controllers: [posts_controller_1.PostsController, users_controller_1.UserController],
        exports: [users_service_1.UserService],
    })
], GlobalModule);
//# sourceMappingURL=global.module.js.map