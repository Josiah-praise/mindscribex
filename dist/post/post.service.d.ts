import { CreatePostResponseDto, PaginatedPostResponse, UpdatePostDto, CreatePostDto } from './post.dto';
import { PrismaService } from 'src/services/prisma.service';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
import { FileUploadService } from 'src/services/fileUpload.service';
import { CommentResponseDto } from 'src/dtos/comments.dto';
export declare class PostService {
    private readonly prismaService;
    private readonly fileUploadService;
    constructor(prismaService: PrismaService, fileUploadService: FileUploadService);
    create(createPostDto: CreatePostDto, userId: string, file?: Express.Multer.File): Promise<CreatePostResponseDto>;
    findAll(page?: number, limit?: number, searchQuery?: string, authorId?: string): Promise<PaginatedPostResponse>;
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
    update(user: UserResponseDto, file: Express.Multer.File, postId: string, updatePostDto: UpdatePostDto): Promise<{
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
    remove(id: string, userId: string): Promise<{
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
    uploadFile(user: UserResponseDto, file: Express.Multer.File): Promise<{
        url: string;
    }>;
    likePost(postId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        postId: string;
    }>;
    unlikePost(postId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        postId: string;
    }>;
    getLikes(postId: string, user: any): Promise<{
        count: number;
        isLikedByUser: boolean;
    }>;
    comment(comment: string, userId: string, postId: string): Promise<CommentResponseDto>;
    updateComment(comment: string, userId: string, postId: string): Promise<CommentResponseDto>;
    getComments(postId: string, page?: number, limit?: number): Promise<{
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
    deleteComment(postId: string, userId: string): Promise<void>;
    bookmark(postId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        postId: string;
    }>;
    removeBookmark(userId: string, postId: string): Promise<void>;
    getBookmark(postId: string, userId: string): Promise<{
        isBookmarked: boolean;
        bookmarkedAt: Date;
    }>;
}
