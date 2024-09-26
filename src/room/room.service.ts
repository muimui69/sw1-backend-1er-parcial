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

    async findById(roomId: string): Promise<Room> {
        return this.roomModel.findById(roomId).populate('host participants').exec();
    }

    async updateRoomStatus(roomId: string, isOpen: boolean): Promise<Room> {
        return this.roomModel.findByIdAndUpdate(roomId, { isOpen }, { new: true }).exec();
    }

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
        const room = await this.roomModel.findById(roomId).exec();
        if (!room) {
            throw new Error('Room not found');
        }

        if (room.host.toString() === userId) {
            throw new Error('The host cannot be added as a collaborator');
        }

        return this.roomModel
            .findByIdAndUpdate(roomId, { $push: { participants: userId } }, { new: true })
            .populate('host participants')
            .exec();
    }

}
