import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class InviteService {
    constructor(private mailerService: MailerService) { }

    async sendInvitationEmail(userEmail: string, roomId: string, roomName: string, inviterName: string) {
        const invitationUrl = `http://localhost:3000/invite/accept?roomId=${roomId}&roomName=${roomName}`;
        await this.mailerService.sendMail({
            to: userEmail,
            subject: `Invitación a la sala ${roomName}`,
            template: './invite',
            context: {
                inviterName,
                invitationUrl,
            },
        });
    }

}
