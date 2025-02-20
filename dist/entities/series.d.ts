import { Post } from './post';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
export declare class series {
    id: string;
    title: string;
    owner: UserResponseDto;
    ownerId: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}
