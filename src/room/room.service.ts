import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomInput } from './dto/create-room.input';
import { Room, RoomDocument } from './schemas/room.schema';
import { v4 as uuidv4 } from 'uuid';
import { InviteService } from 'src/invite/invite.service';
import { UserService } from '../user/user.service';
import { UserDocument } from 'src/user/schemas/user.schema';
import { Invitation } from '@/common/types/room.type';


@Injectable()
export class RoomService {
    constructor(
        @InjectModel('Room') private roomModel: Model<RoomDocument>,
        private inviteService: InviteService,
        private userService: UserService
    ) { }

    async findAll(): Promise<Room[]> {
        return this.roomModel
            .find()
            .populate('host')
            .populate({
                path: 'participants.user',
                model: 'User'
            })
            .exec();
    }

    async findAllRoomsByUser(userId: string): Promise<Room[]> {
        return this.roomModel
            .find({ host: userId }) // Buscar solo las salas donde el usuario es el host
            .populate('host') // Popula los detalles del host
            .exec();
    }


    async findRoomsByParticipant(userId: string): Promise<Room[]> {
        return this.roomModel
            .find({ 'participants.user': userId }) // Busca por usuario en los participantes
            .populate('host')
            .populate('participants.user')
            .exec();
    }


    async findAllInvitationsByHost(userId: string): Promise<Invitation[]> {
        const rooms = await this.roomModel.find({ host: userId }).exec();

        if (!rooms.length) {
            throw new Error('No rooms found for this host');
        }

        const allInvitations: Invitation[] = [];
        rooms.forEach(room => {
            allInvitations.push(...room.invitations);
        });

        return allInvitations;
    }



    async findById(roomId: string): Promise<Room> {
        return this.roomModel.findById(roomId).populate('host participants').exec();
    }

    async updateRoomStatus(roomId: string, isOpen: boolean): Promise<Room> {
        return this.roomModel.findByIdAndUpdate(roomId, { isOpen }, { new: true }).exec();
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


    async addCollaborators(roomId: string, emails: string[]): Promise<Room> {
        const room = await this.roomModel.findById(roomId).populate('host participants.user').exec();
        if (!room) throw new Error('Room not found');

        const newInvitations = [];
        for (const email of emails) {
            const user = await this.userService.findByEmail(email);
            if (!user) {
                const invitationExists = room.invitations.some(invitation => invitation.email === email);
                if (!invitationExists) {
                    newInvitations.push({ email, status: 'PENDING' });
                }
            } else {
                const userAdd = (user as UserDocument)._id?.toString();
                if ((room.host as UserDocument)._id.toString() === userAdd) {
                    throw new Error(`The host cannot be added as a collaborator`);
                }
            }
        }

        room.invitations.push(...newInvitations);
        await room.save();

        emails.forEach(async (email) => {
            await this.inviteService.sendInvitationEmail(email, roomId, room.title, room.host.username);
        });

        return room;
    }


    async acceptInvitation(roomId: string, email: string): Promise<Room> {
        const room = await this.roomModel.findById(roomId).populate('host participants.user').exec();
        if (!room) throw new Error('Room not found');

        const invitation = room.invitations.find(invite => invite.email === email);
        if (!invitation) throw new Error('Invitation not found');

        const user = await this.userService.findByEmail(email);
        if (!user) throw new Error('User not found');


        const isAlreadyCollaborator = room.participants.some(participant => participant.user._id.toString() === (user as UserDocument)._id.toString());
        if (isAlreadyCollaborator) throw new Error('User is already a collaborator in this room');

        room.participants.push({ user: (user as UserDocument).toObject(), role: 'COLLABORATOR' });
        invitation.status = 'ACCEPTED';

        await room.save();
        return room;
    }



    private generateRoomCode(): string {
        return uuidv4();
    }

}
