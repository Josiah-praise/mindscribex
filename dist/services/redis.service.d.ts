import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class RedisService {
    private readonly configService;
    private readonly jwtService;
    private readonly redis;
    constructor(configService: ConfigService, jwtService: JwtService);
    isValidToken(token: string): Promise<boolean>;
    invalidateToken(userId: string, token: string): Promise<any>;
    calculateTtl(token: string): Promise<number>;
}
