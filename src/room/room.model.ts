import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Room {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    hostId: string;

    @Field(() => [String], { nullable: true })
    participants?: string[];

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    code?: string;

    @Field({ nullable: true })
    xml?: string; // XML code for the room (optional)
}
