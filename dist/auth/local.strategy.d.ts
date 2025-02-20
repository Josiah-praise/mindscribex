import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
declare const PassportLocalStrategy_base: new (...args: any[]) => Strategy;
export declare class PassportLocalStrategy extends PassportLocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<UserResponseDto>;
}
export {};
