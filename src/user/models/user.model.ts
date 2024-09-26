import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRole } from '@/common/enums/user-role.enum';

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
