import { ConfigService } from '@nestjs/config';
export declare class EncryptionService {
    private readonly configService;
    constructor(configService: ConfigService);
    hashPassword(password: string): Promise<string>;
    checkPassword(password: string, hash: string): Promise<boolean>;
}
