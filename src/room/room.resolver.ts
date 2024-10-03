import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './models/room.model';
import { Invitation } from './models/invitation.model';

@Resolver(() => Room)
export class RoomResolver {
    constructor(private readonly roomService: RoomService) { }

    @Query(() => [Room])
    async Rooms() {
        return this.roomService.findAll();
    }

    @Query(() => [Room])
    async RoomByUser(
        @Args('userId') userId: string
    ) {
        return this.roomService.findAllRoomsByUser(userId);
    }

    @Query(() => [Room])
    async RoomByHostInvitated(
        @Args('userId') userId: string
    ) {
        return this.roomService.findRoomsByParticipant(userId);
    }

    @Query(() => [Invitation])
    async getAllInvitations(@Args('roomId') roomId: string) {
        return this.roomService.findAllInvitations(roomId);
    }

    @Mutation(() => Room)
    async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
        return this.roomService.create(createRoomInput);
    }


    @Mutation(() => Room)
    async addCollaborators(
        @Args('roomId') roomId: string,
        @Args({ name: 'emails', type: () => [String] }) emails: string[],
    ) {
        return this.roomService.addCollaborators(roomId, emails);
    }

    @Mutation(() => Room)
    async acceptInvitation(
        @Args('roomId') roomId: string,
        @Args('email') email: string,
    ) {
        return this.roomService.acceptInvitation(roomId, email);
    }


    @Mutation(() => Room)
    async closeRoom(
        @Args('roomId') roomId: string,
        @Args('hostId') hostId: string
    ) {
        const room = await this.roomService.findById(roomId);

        if (!room) {
            throw new Error('Room not found');
        }

        if (room.host.toString() !== hostId) {
            throw new Error('Only the host can close the room');
        }

        return this.roomService.updateRoomStatus(roomId, false);
    }


    @Mutation(() => Room)
    async openRoom(
        @Args('roomId') roomId: string,
        @Args('hostId') hostId: string
    ) {
        const room = await this.roomService.findById(roomId);

        if (!room) {
            throw new Error('Room not found');
        }

        if (room.host.toString() !== hostId) {
            throw new Error('Only the host can open the room');
        }

        return this.roomService.updateRoomStatus(roomId, true);
    }

}

