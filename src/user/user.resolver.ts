import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './models/user.model';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => [User])
    async Users() {
        return this.userService.findAll();
    }

    @Mutation(() => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.create(createUserInput);
    }
}
