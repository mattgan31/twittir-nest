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
exports.RelationshipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Relationships_1 = require("../../output/entities/Relationships");
const typeorm_2 = require("typeorm");
let RelationshipService = exports.RelationshipService = class RelationshipService {
    constructor(relationshipRepo) {
        this.relationshipRepo = relationshipRepo;
    }
    async followUser(user_id, user) {
        const mineUserId = user.id;
        const otherUserId = user_id;
        const isMineFollowingThisUser = await this.relationshipRepo.findOne({ where: { followerId: mineUserId, followingId: otherUserId } });
        if (!isMineFollowingThisUser) {
            const relationship = new Relationships_1.Relationships();
            relationship.followerId = mineUserId;
            relationship.followingId = otherUserId;
            relationship.createdAt = new Date();
            relationship.updatedAt = new Date();
            await this.relationshipRepo.save(relationship);
            return {
                message: `You are followed ${otherUserId}`
            };
        }
        else {
            await this.relationshipRepo.delete({ followerId: mineUserId, followingId: otherUserId });
            return {
                message: `You are unfollow ${otherUserId}`
            };
        }
    }
};
exports.RelationshipService = RelationshipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Relationships_1.Relationships)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RelationshipService);
//# sourceMappingURL=relationship.service.js.map