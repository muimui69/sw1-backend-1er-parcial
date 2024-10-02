import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from '../user/dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response.dto';
import { User } from 'src/user/models/user.model';
import { UserRole } from '@/common/enums/user-role.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async register(createUserInput: CreateUserInput): Promise<AuthResponse> {
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        const user = await this.userService.create({
            ...createUserInput,
            password: hashedPassword,
            role: UserRole.HOST,
        }) as User;

        return this.generateToken(user);
    }

    async login(loginInput: LoginInput): Promise<AuthResponse> {
        const { email, password } = loginInput;
        const user = await this.userService.findByEmail(email) as User;

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateToken(user);
    }

    private generateToken(user: User): AuthResponse {
        const payload = { email: user.email, sub: user.id };
        return {
            token: this.jwtService.sign(payload),
            user,
        };
    }
}
