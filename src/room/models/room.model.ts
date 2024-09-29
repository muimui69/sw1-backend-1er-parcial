import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { Invitation } from './invitation.model';
import { Participant } from './participant.model';


@ObjectType()
export class Room {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field(() => User)
    host: User;

    @Field(() => [Participant])
    participants: Participant[];

    @Field(() => [Invitation])
    invitations: Invitation[];

    @Field({ nullable: true })
    description?: string;

    @Field()
    code?: string;

    @Field({ nullable: true })
    xml?: string;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}


