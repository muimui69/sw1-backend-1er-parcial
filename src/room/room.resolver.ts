import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { CreateRoomInput } from './dto/create-room.input';
import { Room } from './room.model';

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
}
