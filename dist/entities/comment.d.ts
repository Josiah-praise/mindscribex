import { Post } from './post';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
export declare class Comment {
    id: string;
    user: UserResponseDto;
    userId: string;
    post: Post;
    postId: string;
    comment: string;
    parent?: Comment;
    parentId?: string;
    commentReplies?: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
