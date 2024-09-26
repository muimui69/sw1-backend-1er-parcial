import { UserRole } from '@/common/enums/user-role.enum';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => UserRole, { nullable: true })
    role?: UserRole;
}
