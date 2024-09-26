import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';
import { Room, RoomSchema } from './models/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [RoomService, RoomResolver],
})
export class RoomModule { }
