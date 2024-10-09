import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InviteService } from './invite.service';
import { CreateInvitationInput } from './dto/create-invitation.input';

@Resolver()
export class RoomResolver {
    constructor(private inviteService: InviteService) { }

    @Mutation(() => Boolean)
    async sendInvite(@Args('createInvitationInput') createInvitationInput: CreateInvitationInput) {
        await this.inviteService.sendInvitationEmail(createInvitationInput);
        return true;
    }
}
