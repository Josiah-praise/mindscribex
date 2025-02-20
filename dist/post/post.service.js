"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../services/prisma.service");
const fileUpload_service_1 = require("../services/fileUpload.service");
const client_1 = require("@prisma/client");
let PostService = class PostService {
    constructor(prismaService, fileUploadService) {
        this.prismaService = prismaService;
        this.fileUploadService = fileUploadService;
    }
    async create(createPostDto, userId, file) {
        let bannerUrl;
        bannerUrl = createPostDto.bannerUrl;
        if (!bannerUrl && file)
            bannerUrl = await this.fileUploadService.uploadFile(file, userId);
        let data;
        if (bannerUrl) {
            data = {
                ...createPostDto,
                bannerUrl,
                authorId: userId,
            };
        }
        else {
            data = {
                ...createPostDto,
                authorId: userId,
            };
        }
        try {
            const post = await this.prismaService.post.create({ data });
            return post;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException({
                message: 'Error creating post',
                error: err.message,
            });
        }
    }
    async findAll(page = 1, limit = 20, searchQuery = '', authorId) {
        if (page < 1)
            page = 1;
        if (limit < 1)
            limit = 10;
        const total = await this.prismaService.post.count({
            where: {
                OR: searchQuery
                    ? [
                        { title: { contains: searchQuery, mode: 'insensitive' } },
                        { content: { contains: searchQuery, mode: 'insensitive' } },
                    ]
                    : undefined,
                authorId,
            },
        });
        if (!total)
            return {
                data: [],
                meta: {
                    total,
                    page: 0,
                    currPageTotal: 0,
                    limit,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPreviousPage: false,
                },
            };
        const totalPages = Math.ceil(total / limit);
        page = page > totalPages ? totalPages : page;
        const skip = (page - 1) * limit;
        const posts = await this.prismaService.post.findMany({
            skip,
            take: limit,
            where: {
                OR: searchQuery
                    ? [
                        { title: { contains: searchQuery, mode: 'insensitive' } },
                        { content: { contains: searchQuery, mode: 'insensitive' } },
                    ]
                    : undefined,
                authorId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                    },
                },
            },
        });
        return {
            data: posts,
            meta: {
                total,
                page,
                currPageTotal: posts.length,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
    async findOne(id) {
        return await this.prismaService.post.findUnique({
            where: {
                id,
            },
            include: {
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                    },
                },
                author: {
                    select: {
                        id: true,
                        avatarUrl: true,
                        firstname: true,
                        lastname: true,
                    },
                },
            },
        });
    }
    async update(user, file, postId, updatePostDto) {
        let $bannerUrl;
        $bannerUrl = updatePostDto.bannerUrl;
        if (!$bannerUrl && file)
            $bannerUrl = await this.fileUploadService.uploadFile(file, user.id);
        try {
            return await this.prismaService.post.update({
                where: { id: postId, authorId: user.id },
                data: {
                    ...updatePostDto,
                    bannerUrl: $bannerUrl ? $bannerUrl : undefined,
                },
            });
        }
        catch (error) {
            if (!(error instanceof client_1.Prisma.PrismaClientKnownRequestError))
                throw error;
            if (error.code === 'P2025')
                throw new common_1.NotFoundException('Record not found');
        }
    }
    async remove(id, userId) {
        try {
            return await this.prismaService.post.delete({
                where: { id, authorId: userId },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025')
                throw new common_1.NotFoundException("Post doesn't exist");
            throw error;
        }
    }
    async uploadFile(user, file) {
        return {
            url: await this.fileUploadService.uploadFile(file, user.id),
        };
    }
    async likePost(postId, userId) {
        try {
            return await this.prismaService.postLike.create({
                data: {
                    userId,
                    postId,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025')
                throw new common_1.NotFoundException('Post does not exist');
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002')
                throw new common_1.ConflictException('Post has already been liked');
            throw error;
        }
    }
    async unlikePost(postId, userId) {
        try {
            return await this.prismaService.postLike.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025')
                throw new common_1.NotFoundException('Post was never liked');
            throw error;
        }
    }
    async getLikes(postId, user) {
        const count = await this.prismaService.postLike.count({
            where: {
                postId,
            },
        });
        let like;
        if (user)
            like = await this.prismaService.postLike.findUnique({
                where: {
                    userId_postId: {
                        postId,
                        userId: user.id,
                    },
                },
            });
        return {
            count,
            isLikedByUser: like ? true : false,
        };
    }
    async comment(comment, userId, postId) {
        try {
            return await this.prismaService.comment.create({
                data: {
                    userId,
                    postId,
                    comment,
                },
            });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === 'P2002')
                throw new common_1.ConflictException('You can have only one comment per post');
            throw err;
        }
    }
    async updateComment(comment, userId, postId) {
        try {
            return await this.prismaService.comment.update({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
                data: {
                    comment,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException('Comment not found');
            }
            throw error;
        }
    }
    async getComments(postId, page = 1, limit = 10) {
        if (page < 1)
            page = 1;
        if (limit < 1)
            limit = 10;
        const total = await this.prismaService.comment.count({
            where: {
                postId,
            },
        });
        if (!total)
            return {
                data: [],
                meta: {
                    total,
                    page: 0,
                    currPageTotal: 0,
                    limit,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPreviousPage: false,
                },
            };
        const totalPages = Math.ceil(total / limit);
        page = page > totalPages ? totalPages : page;
        const skip = (page - 1) * limit;
        const comments = await this.prismaService.comment.findMany({
            where: {
                postId,
            },
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstname: true,
                        lastname: true,
                        avatarUrl: true,
                    },
                },
            },
        });
        return {
            data: comments,
            meta: {
                total,
                page,
                currPageTotal: comments.length,
                limit,
                totalPages,
                hasNextPage: totalPages > page,
                hasPreviousPage: page > 1,
            },
        };
    }
    async deleteComment(postId, userId) {
        try {
            await this.prismaService.comment.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025')
                throw new common_1.NotFoundException("Comment doesn't exist");
            throw error;
        }
    }
    async bookmark(postId, userId) {
        try {
            return await this.prismaService.bookmark.create({
                data: {
                    userId,
                    postId,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002')
                throw new common_1.ConflictException('Post is already bookmarked ');
            throw error;
        }
    }
    async removeBookmark(userId, postId) {
        try {
            await this.prismaService.bookmark.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025')
                throw new common_1.NotFoundException('Post was never bookmarked in the first place');
            throw error;
        }
    }
    async getBookmark(postId, userId) {
        const bookmark = await this.prismaService.bookmark.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });
        return bookmark
            ? { isBookmarked: true, bookmarkedAt: bookmark.createdAt }
            : { isBookmarked: false, bookmarkedAt: null };
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        fileUpload_service_1.FileUploadService])
], PostService);
//# sourceMappingURL=post.service.js.map