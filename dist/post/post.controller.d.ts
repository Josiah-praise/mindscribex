import { PostService } from './post.service';
import { PrismaService } from 'src/services/prisma.service';
import { Request } from 'express';
import { CreatePostResponseDto, PaginatedPostResponse, PaginationDTO, PaginationWithSearchDTO, UpdatePostDto, CreatePostDto } from './post.dto';
import { CommentResponseDto, CreateCommentDto } from 'src/dtos/comments.dto';
export declare class PostController {
    private readonly postService;
    private readonly prismaService;
    constructor(postService: PostService, prismaService: PrismaService);
    create(createPostDto: CreatePostDto, file: Express.Multer.File, req: Request): Promise<CreatePostResponseDto>;
    getUserPosts(req: Request, paginationWithSearchDto: PaginationWithSearchDTO): Promise<PaginatedPostResponse>;
    isLiked(postId: any, req: Request): Promise<{
        isLiked: boolean;
    }>;
    findAll(paginationWithSearchDto: PaginationWithSearchDTO): Promise<PaginatedPostResponse>;
    findOne(id: string): Promise<{
        _count: {
            comments: number;
            likes: number;
        };
        author: {
            firstname: string;
            lastname: string;
            id: string;
            avatarUrl: string;
        };
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        published: boolean;
        readTime: number | null;
        bannerUrl: string;
        seriesId: string | null;
        authorId: string;
    }>;
    update(file: Express.Multer.File, id: string, updatePostDto: UpdatePostDto, req: Request): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        published: boolean;
        readTime: number | null;
        bannerUrl: string;
        seriesId: string | null;
        authorId: string;
    }>;
    delete(id: string, req: Request): Promise<void>;
    uploadMedia(file: Express.Multer.File, req: Request): Promise<{
        url: string;
    }>;
    likePost(postId: any, req: Request): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        postId: string;
    }>;
    unlikePost(postId: any, req: Request): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        postId: string;
    }>;
    getLikes(postId: any, req: Request): Promise<{
        count: number;
        isLikedByUser: boolean;
    }>;
    comment(createCommentDto: CreateCommentDto, req: Request, postId: string): Promise<CommentResponseDto>;
    updateComment(createCommentDto: CreateCommentDto, req: Request, postId: string): Promise<CommentResponseDto>;
    getComments(paginationDto: PaginationDTO, postId: string): Promise<{
        data: ({
            user: {
                username: string;
                firstname: string;
                lastname: string;
                id: string;
                avatarUrl: string;
            };
        } & {
            comment: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            postId: string;
            parentId: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            currPageTotal: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    deleteComment(req: Request, postId: string): Promise<void>;
    bookmark(postId: string, req: Request): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        postId: string;
    }>;
    removeBookmark(postId: string, req: Request): Promise<void>;
    getBookmark(postId: string, req: Request): Promise<{
        isBookmarked: boolean;
        bookmarkedAt: Date;
    }>;
}
