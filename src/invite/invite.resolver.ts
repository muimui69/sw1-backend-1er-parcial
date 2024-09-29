import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InviteService } from './invite.service';

@Resolver()
export class RoomResolver {
    constructor(private inviteService: InviteService) { }

    @Mutation(() => Boolean)
    async sendInvite(
        @Args('userEmail') userEmail: string,
        @Args('roomId') roomId: string,
        @Args('roomName') roomName: string,
        @Args('inviterName') inviterName: string,
    ) {
        await this.inviteService.sendInvitationEmail(userEmail, roomId, roomName, inviterName);
        return true;
    }
}
