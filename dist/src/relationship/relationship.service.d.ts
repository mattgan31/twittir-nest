import { Relationships } from 'output/entities/Relationships';
import { Repository } from 'typeorm';
export declare class RelationshipService {
    private relationshipRepo;
    constructor(relationshipRepo: Repository<Relationships>);
    followUser(user_id: number, user: any): Promise<{
        message: string;
    }>;
}
