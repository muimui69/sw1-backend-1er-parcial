import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './models/room.model';

@Resolver(() => Room)
export class RoomResolver {
    constructor(private readonly roomService: RoomService) { }

    @Query(() => [Room])
    async getRooms() {
        return this.roomService.findAll();
    }

    @Mutation(() => Room)
    async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
        return this.roomService.create(createRoomInput);
    }

    @Mutation(() => Room)
    async addCollaborator(
        @Args('roomId') salaId: string,
        @Args('userId') userId: string,
    ) {
        return this.roomService.addCollaborator(salaId, userId);
    }

    @Mutation(() => Room)
    async closeRoom(@Args('roomId') roomId: string, @Args('hostId') hostId: string) {
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
    async openRoom(@Args('roomId') roomId: string, @Args('hostId') hostId: string) {
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

