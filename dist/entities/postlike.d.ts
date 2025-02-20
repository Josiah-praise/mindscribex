import { Post } from './post';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
export declare class PostLike {
    id: string;
    user: UserResponseDto;
    userId: string;
    post: Post;
    postId: string;
    isLiked: boolean;
    createdAt: Date;
    updatedAt: Date;
}
