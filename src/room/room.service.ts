import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './room.schema';
import { CreateRoomInput } from './dto/create-room.input';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel('Room') private roomModel: Model<RoomDocument>,  // Aquí se inyecta el RoomModel
    ) { }

    async findAll(): Promise<Room[]> {
        return this.roomModel.find().populate('host participants').exec();
    }

    async create(createRoomInput: CreateRoomInput): Promise<Room> {
        const newRoom = new this.roomModel({
            ...createRoomInput,
            host: createRoomInput.hostId,
        });
        await newRoom.save();

        return this.roomModel.findById(newRoom._id).populate('host').exec();
    }


    async addCollaborator(roomId: string, userId: string): Promise<Room> {
        return this.roomModel
            .findByIdAndUpdate(roomId, { $push: { participants: userId } })
            .exec();
    }
}
