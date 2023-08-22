import { RelationshipService } from './relationship.service';
export declare class RelationshipController {
    private readonly relationshipService;
    constructor(relationshipService: RelationshipService);
    followUser(param: any, req: any): Promise<{
        message: string;
    }>;
}
