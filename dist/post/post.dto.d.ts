export declare class CreatePostDto {
    title: string;
    content: string;
    published?: boolean;
    readTime?: number;
    bannerUrl?: string;
    seriesId?: string;
}
declare const UpdatePostDto_base: Type<Partial<T>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
}
export declare class CreatePostResponseDto extends CreatePostDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
declare class Count {
    comments: number;
    likes: number;
}
declare class Author {
    id: string;
    avatarUrl: string;
    username: string;
    firstname: string;
    lastname: string;
}
export declare class GetPostsResponseDto extends CreatePostResponseDto {
    author: Author;
    _count: Count;
}
export declare class PaginatedPostResponse {
    data: GetPostsResponseDto[];
    meta: {
        total: number;
        page: number;
        limit: number;
        currPageTotal: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}
export declare class PaginationDTO {
    page?: number;
    limit?: number;
}
export declare class PaginationWithSearchDTO extends PaginationDTO {
    q?: string;
}
export {};
