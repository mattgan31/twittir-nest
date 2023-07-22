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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const Users_1 = require("../../output/entities/Users");
const typeorm_2 = require("typeorm");
const Bcrypt = require("bcrypt");
let UserService = exports.UserService = class UserService {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async validateUser(username, password) {
        const user = await this.userRepo.findOne({
            where: [{ username: username }],
        });
        const compare = await Bcrypt.compare(password, user.password);
        if (compare) {
            const { ...result } = user;
            return result;
        }
    }
    async signin(user) {
        const payload = {
            id: user.id,
            username: user.username,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async getUserById(id) {
        return await this.userRepo.findOne({ where: { id } });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map