import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { Room, RoomSchema } from './schemas/room.schema';
import { InviteModule } from 'src/invite/invite.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    InviteModule,
    UserModule,
  ],
  providers: [RoomService, RoomResolver],
})
export class RoomModule { }
