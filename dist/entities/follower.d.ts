import { UserResponseDto } from 'src/users/dto/userResponse.dto';
export declare class Follower {
    id: string;
    user: UserResponseDto;
    userId: string;
    following: UserResponseDto;
    followingId: string;
    createdAt: Date;
    updatedAt: Date;
}
