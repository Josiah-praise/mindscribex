import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../services/redis.service';
import { SignupReturnDto } from './dto/signup.return.dto';
import { UserLoginInfoService } from 'src/services/logininfo.service';
import { EmailService } from 'src/services/email.service';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    private readonly configService;
    private readonly redisService;
    private readonly userLoginInfoService;
    private readonly emailService;
    constructor(authService: AuthService, jwtService: JwtService, configService: ConfigService, redisService: RedisService, userLoginInfoService: UserLoginInfoService, emailService: EmailService);
    signUp(createUserDto: CreateUserDto): Promise<SignupReturnDto>;
    login(req: Request): Promise<{
        accessToken: string;
        user: Express.User;
    }>;
    logout(req: Request): Promise<void>;
}
