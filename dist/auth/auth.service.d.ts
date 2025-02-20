import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { EncryptionService } from 'src/services/encryption.service';
import { User } from 'src/entities/user';
export declare class AuthService {
    private readonly encryptionService;
    private readonly usersService;
    private readonly configService;
    constructor(encryptionService: EncryptionService, usersService: UsersService, configService: ConfigService);
    createAccount(createUserDto: CreateUserDto): Promise<User>;
    validateUser(email: string, password: string): Promise<User | null>;
}
