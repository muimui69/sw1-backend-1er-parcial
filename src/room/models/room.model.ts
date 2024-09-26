import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Room {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field(() => User)
    host: User;

    @Field(() => [String], { nullable: true })
    participants?: string[];

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    code?: string;

    @Field({ nullable: true })
    xml?: string;
}
