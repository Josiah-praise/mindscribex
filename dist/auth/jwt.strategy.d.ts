import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { RedisService } from '../services/redis.service';
import { Request } from 'express';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
type payload = {
    id: string;
    email: string;
    [key: string]: string;
};
declare const PassportJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class PassportJwtStrategy extends PassportJwtStrategy_base {
    private readonly configService;
    private readonly usersService;
    private readonly redisService;
    constructor(configService: ConfigService, usersService: UsersService, redisService: RedisService);
    validate(req: Request, payload: payload): Promise<UserResponseDto>;
}
export {};
