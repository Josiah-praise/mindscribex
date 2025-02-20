import { PaginationMetaDataDto } from 'src/users/dto/userResponse.dto';
export declare class CreateCommentDto {
    comment: string;
}
export declare class CommentResponseDto {
    userId: string;
    postId: string;
    comment: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PaginatedCommentsDto {
    data: CommentResponseDto[];
    meta: PaginationMetaDataDto;
}
