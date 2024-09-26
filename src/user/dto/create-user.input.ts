import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../model/user.model';


@InputType()
export class CreateUserInput {
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => UserRole, { nullable: true }) // Ahora el rol es opcional, pero solo puede ser uno de los valores del enum
    role?: UserRole;
}
