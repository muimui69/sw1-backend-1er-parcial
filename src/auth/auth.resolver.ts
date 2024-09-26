import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../user/dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response.dto';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthResponse)
    async register(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ): Promise<AuthResponse> {
        return this.authService.register(createUserInput);
    }

    @Mutation(() => AuthResponse)
    async login(
        @Args('loginInput') loginInput: LoginInput,
    ): Promise<AuthResponse> {
        return this.authService.login(loginInput);
    }
}
