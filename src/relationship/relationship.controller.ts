import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { RelationshipService } from './relationship.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class RelationshipController {
    constructor(private readonly relationshipService: RelationshipService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post(':user_id/follow')
    public async followUser(@Param() param: any, @Request() req: any) {
        return this.relationshipService.followUser(param.user_id, req.user);
    }
}
