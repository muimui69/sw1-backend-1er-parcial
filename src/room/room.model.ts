import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../user/model/user.model';  // Asumiendo que tienes un modelo User

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
