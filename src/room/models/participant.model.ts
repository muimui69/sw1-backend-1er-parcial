import { UserRole } from '@/common/enums/user-role.enum';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Participant {
    @Field(() => User)
    user: User;

    @Field(() => UserRole)
    role: UserRole;
}
