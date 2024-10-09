import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInvitationInput {
    @Field()
    userEmail: string;

    @Field()
    roomId: string;

    @Field()
    roomName: string;

    @Field()
    inviterName: string;

    @Field()
    inviterMail: string;

}

