import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InviteService } from './invite.service';

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get<string>("HOST_EMAIL"),
                    secure: false,
                    auth: {
                        user: config.get<string>("ACCOUNT_EMAIL"),
                        pass: config.get<string>("PASSWORD_EMAIL"),
                    },
                },
                defaults: {
                    from: `"No Reply" <${config.get<string>('ACCOUNT_EMAIL')}>`,
                },
                template: {
                    dir: join(process.cwd(), 'src/invite/templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },

            }),
            inject: [ConfigService],
        }),
        ConfigModule
    ],
    providers: [InviteService],
    exports: [InviteService],
})
export class InviteModule { }