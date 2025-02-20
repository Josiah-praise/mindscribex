import { Post } from './post';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
export declare class Bookmark {
    id: string;
    user: UserResponseDto;
    userId: string;
    post: Post;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
}
