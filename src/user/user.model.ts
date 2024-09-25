import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()  // Decorador para indicar que esta clase es un tipo de GraphQL
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    password?: string;

    @Field(() => [String], { nullable: true })
    roles?: string[];

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}
