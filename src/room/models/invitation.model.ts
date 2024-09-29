import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Invitation {
    @Field(() => ID)
    id: string;

    @Field()
    email: string;

    @Field()
    status: string;
}