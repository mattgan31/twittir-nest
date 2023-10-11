import { Controller, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { RelationshipService } from './relationship.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class RelationshipController {
    constructor(private readonly relationshipService: RelationshipService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/follow')
    public async followUser(
        @Param('id', ParseIntPipe) userId: number,
        @Request() req: any) {

        return this.relationshipService.followUser(userId, req.user);
    }
}
