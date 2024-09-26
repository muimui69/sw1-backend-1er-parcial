import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomInput } from './dto/create-room.input';
import { Room, RoomDocument } from './models/room.schema';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class RoomService {
    constructor(
        @InjectModel('Room') private roomModel: Model<RoomDocument>,
    ) { }

    async findById(roomId: string): Promise<Room> {
        return this.roomModel.findById(roomId).populate('host participants').exec();
    }

    async updateRoomStatus(roomId: string, isOpen: boolean): Promise<Room> {
        return this.roomModel.findByIdAndUpdate(roomId, { isOpen }, { new: true }).exec();
    }

    async findAll(): Promise<Room[]> {
        return this.roomModel
            .find()
            .populate('host')
            .populate({
                path: 'participants',
                model: 'User'
            })
            .exec();
    }


    async create(createRoomInput: CreateRoomInput): Promise<Room> {
        const roomCode = createRoomInput.code || this.generateRoomCode();

        const newRoom = new this.roomModel({
            ...createRoomInput,
            host: createRoomInput.hostId,
            code: roomCode
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

        const isAlreadyCollaborator = room.participants.some(participant => participant.toString() === userId);

        if (isAlreadyCollaborator) {
            throw new Error('User is already a collaborator in this room');
        }

        return this.roomModel
            .findByIdAndUpdate(roomId, { $push: { participants: userId } }, { new: true })
            .populate('host participants')
            .exec();
    }

    private generateRoomCode(): string {
        return uuidv4();
    }

}
