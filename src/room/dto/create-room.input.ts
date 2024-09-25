import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
    @Field()
    title: string;  // Name of the room

    @Field()
    hostId: string;  // ID of the host (user creating the room)

    @Field({ nullable: true })
    description?: string;  // Description of the room (optional)

    @Field()
    code: string;  // Unique code to identify the room

    @Field(() => [String], { nullable: true })
    participants?: string[];  // List of participant IDs (optional)

    @Field({ nullable: true })
    xml?: string; // XML code for the room (optional)
}
