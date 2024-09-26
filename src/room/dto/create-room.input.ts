import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
    @Field()
    title: string;

    @Field()  // Esto será el ObjectId del host
    hostId: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    code?: string;
}
