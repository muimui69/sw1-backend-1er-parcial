import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../user/user.model';  // Asumiendo que tienes un modelo User

@ObjectType()
export class Room {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field(() => User) // Aquí referenciamos a un User, para usar el ObjectId en MongoDB
    host: User;

    @Field(() => [String], { nullable: true })
    participants?: string[];

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    code?: string;

    @Field({ nullable: true })
    xml?: string; // XML code for the room (optional)
}
