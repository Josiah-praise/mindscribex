import { Comment } from './comment';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
export declare class CommentLike {
    id: string;
    user: UserResponseDto;
    userId: string;
    isLiked: boolean;
    comment: Comment;
    commentId: string;
    createdAt: Date;
    updatedAt: Date;
}
