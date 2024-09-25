import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum UserRole {
    COLLABORATOR = 'COLABORADOR',
    HOST = 'ANFITRION',
}

registerEnumType(UserRole, {
    name: 'UserRole',
});

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    password?: string;

    @Field(() => UserRole)
    role: UserRole;

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}
