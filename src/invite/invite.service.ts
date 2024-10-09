import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateInvitationInput } from './dto/create-invitation.input';

@Injectable()
export class InviteService {
    constructor(private mailerService: MailerService) { }

    async sendInvitationEmail(createInvitationInput: CreateInvitationInput) {
        const { inviterMail, inviterName, roomId, roomName, userEmail } = createInvitationInput;
        const invitationUrl = `http://localhost:3000/invite/accept?roomId=${roomId}&roomName=${roomName}`;
        await this.mailerService.sendMail({
            to: userEmail,
            subject: `Invitación a la sala ${roomName}`,
            template: './invite',
            context: {
                inviterMail,
                inviterName,
                invitationUrl,
            },
        });
    }

}
