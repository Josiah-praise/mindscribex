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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../services/prisma.service");
const jwt_guard_1 = require("../auth/jwt.guard");
const utilities_1 = require("../utilities");
const post_dto_1 = require("./post.dto");
const comments_dto_1 = require("../dtos/comments.dto");
const optionaljwt_strategy_1 = require("../auth/optionaljwt.strategy");
let PostController = class PostController {
    constructor(postService, prismaService) {
        this.postService = postService;
        this.prismaService = prismaService;
    }
    async create(createPostDto, file, req) {
        return await this.postService.create(createPostDto, req.user.id, file);
    }
    async getUserPosts(req, paginationWithSearchDto) {
        return await this.postService.findAll(paginationWithSearchDto.page, paginationWithSearchDto.limit, paginationWithSearchDto.q, req.user.id);
    }
    async isLiked(postId, req) {
        const count = await this.prismaService.postLike.count({
            where: {
                userId: req.user.id,
                postId,
            },
        });
        return { isLiked: count === 1 };
    }
    async findAll(paginationWithSearchDto) {
        return await this.postService.findAll(paginationWithSearchDto.page, paginationWithSearchDto.limit, paginationWithSearchDto.q);
    }
    findOne(id) {
        return this.postService.findOne(id);
    }
    async update(file, id, updatePostDto, req) {
        return await this.postService.update(req.user, file, id, updatePostDto);
    }
    async delete(id, req) {
        await this.postService.remove(id, req.user.id);
    }
    async uploadMedia(file, req) {
        return await this.postService.uploadFile(req.user, file);
    }
    async likePost(postId, req) {
        const userId = req.user.id;
        return await this.postService.likePost(postId, userId);
    }
    async unlikePost(postId, req) {
        const userId = req.user.id;
        return await this.postService.unlikePost(postId, userId);
    }
    async getLikes(postId, req) {
        return await this.postService.getLikes(postId, req.user);
    }
    async comment(createCommentDto, req, postId) {
        const userId = req.user.id;
        return await this.postService.comment(createCommentDto.comment, userId, postId);
    }
    async updateComment(createCommentDto, req, postId) {
        return await this.postService.updateComment(createCommentDto.comment, req.user.id, postId);
    }
    async getComments(paginationDto, postId) {
        return await this.postService.getComments(postId, paginationDto.page, paginationDto.limit);
    }
    async deleteComment(req, postId) {
        const userId = req.user.id;
        await this.postService.deleteComment(postId, userId);
    }
    async bookmark(postId, req) {
        const userId = req.user.id;
        return await this.postService.bookmark(postId, userId);
    }
    async removeBookmark(postId, req) {
        const userId = req.user.id;
        return await this.postService.removeBookmark(postId, userId);
    }
    async getBookmark(postId, req) {
        const userId = req.user.id;
        return await this.postService.getBookmark(postId, userId);
    }
};
exports.PostController = PostController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new post',
        description: 'Creates a new blog post with optional banner image.',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Unauthorized')),
    (0, swagger_1.ApiBadRequestResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Bad Request')),
    (0, swagger_1.ApiInternalServerErrorResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Internal server error')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['title', 'content'],
            properties: {
                title: {
                    type: 'string',
                    example: 'The Art of Coding',
                    description: 'Title of the post (3-100 characters)',
                },
                content: {
                    type: 'string',
                    example: 'In this post, we will explore the fundamentals of coding...',
                    description: 'Main content of the post (minimum 10 characters)',
                },
                banner: {
                    type: 'string',
                    format: 'binary',
                    description: 'Optional banner image (max 5MB, jpg/png/gif)',
                },
                published: {
                    type: 'boolean',
                    example: false,
                    description: 'Whether the post should be published immediately',
                    default: true,
                },
                readTime: {
                    type: 'integer',
                    example: 2,
                    description: 'Estimated reading time in minutes',
                },
                seriesId: {
                    type: 'string',
                    format: 'uuid',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                    description: 'Optional UUID of the series this post belongs to',
                },
            },
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: post_dto_1.CreatePostResponseDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('banner')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1000 * 1000 * 5 }),
            new common_1.FileTypeValidator({ fileType: /image\/(jpeg|png|gif)/ }),
        ],
        fileIsRequired: false,
    }))),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.CreatePostDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Get all posts for the logged-in user, with pagination and search functionality',
        summary: 'Retrieve user posts',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized request',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid query parameters for page or limit',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Unexpected error on the server',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved posts',
        type: post_dto_1.PaginatedPostResponse,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'q',
        required: false,
        description: 'Search query to filter posts by title or content',
        example: 'NestJS',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        description: 'Page number for pagination (should be a number)',
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        description: 'Limit of posts per page (should be a number)',
        example: 10,
    }),
    (0, common_1.Get)('my_post'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_dto_1.PaginationWithSearchDTO]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getUserPosts", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'check if post is liked',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'UUID of the post to be checked',
        schema: { type: 'string', format: 'uuid' },
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The post has been successfully liked',
        schema: {
            type: 'object',
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - User is not authenticated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not Found - Post with given ID does not exist',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - User has already liked this post',
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('isliked/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "isLiked", null);
__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'page',
        type: Number,
        example: 12,
        description: 'The page number to get',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        type: Number,
        example: 10,
        description: 'number of posts in a page',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'q',
        type: String,
        example: 'title',
        description: 'a value to perform search with',
        required: false,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Internal server error')),
    (0, swagger_1.ApiBadRequestResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Bad request')),
    (0, swagger_1.ApiOkResponse)({
        type: post_dto_1.PaginatedPostResponse,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Gets all posts with pagination and search support',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PaginationWithSearchDTO]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Retrieve a post by its UUID',
        summary: 'Get a post by ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'UUID of the post to retrieve',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'User does not have permission to access this resource',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid UUID format for post ID',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Post not found with the provided ID',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Unexpected error on the server',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully retrieved the post',
        type: post_dto_1.CreatePostResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update a post by ID',
        description: 'Update an existing post with optional banner image upload',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'UUID of the post to update',
        schema: { type: 'string', format: 'uuid' },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                banner: {
                    type: 'string',
                    format: 'binary',
                    description: 'Banner image file (jpeg, png, or gif, max 5MB)',
                },
                title: {
                    type: 'string',
                    description: 'Updated title of the post',
                },
                content: {
                    type: 'string',
                    description: 'Updated content of the post',
                },
                published: {
                    type: 'boolean',
                    description: 'Published status of the post',
                },
                readTime: {
                    type: 'number',
                    description: 'Estimated read time in minutes',
                },
                seriesId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'UUID of the series this post belongs to',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Post updated successfully',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid' },
                title: { type: 'string' },
                content: { type: 'string' },
                published: { type: 'boolean' },
                readTime: { type: 'number' },
                bannerUrl: { type: 'string' },
                seriesId: { type: 'string', format: 'uuid', nullable: true },
            },
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiForbiddenResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Forbidden')),
    (0, swagger_1.ApiUnauthorizedResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Unauthorized')),
    (0, swagger_1.ApiNotFoundResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Resource not found')),
    (0, swagger_1.ApiBadRequestResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Bad request')),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('banner')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1000 * 1000 * 5 }),
            new common_1.FileTypeValidator({ fileType: /image\/(jpeg|png|gif)/ }),
        ],
        fileIsRequired: false,
    }))),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a post by ID',
        description: 'Remove an existing post. Only the author can delete their own post.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'UUID of the post to delete',
        schema: { type: 'string', format: 'uuid' },
    }),
    (0, swagger_1.ApiNoContentResponse)({
        description: 'Post successfully deleted',
    }),
    (0, swagger_1.ApiForbiddenResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Forbidden - User is not the author of the post')),
    (0, swagger_1.ApiUnauthorizedResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Unauthorized - Authentication required')),
    (0, swagger_1.ApiNotFoundResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Resource not found - Post does not exist')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'uploads media files sent as form data to s3 bucket',
        description: 'files must be sent in File field and only a single file should be sent at a time',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiInternalServerErrorResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Internal server error')),
    (0, swagger_1.ApiBody)({
        description: 'Image file',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Unauthorized')),
    (0, swagger_1.ApiBadRequestResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Bad request')),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Uploaded image sucessfully',
        example: `{url: 'https://mindscribeblog.s3.us-east-1.amazonaws.com/bb0f79f0-c913-45c5-bb63-3181918652c9/bb0f79f0-c913-45c5-bb63-3181918652c9_2024-10-08_Screenshot_from_2023-12-21_18-43-50.png'}`,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Post)('upload_media'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1000 * 1000 * 5 }),
            new common_1.FileTypeValidator({ fileType: /image\/(jpeg|png|gif)/ }),
        ],
    }))),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "uploadMedia", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Like a post',
        description: 'Allows an authenticated user to like a specific post',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'UUID of the post to be liked',
        schema: { type: 'string', format: 'uuid' },
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The post has been successfully liked',
        schema: {
            type: 'object',
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - User is not authenticated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not Found - Post with given ID does not exist',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - User has already liked this post',
    }),
    (0, common_1.Post)(':id/likes'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "likePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Unlike a post',
        description: 'Allows an authenticated user to unlike a specific post',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'UUID of the post to be liked',
        schema: { type: 'string', format: 'uuid' },
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The post has been successfully liked',
        schema: {
            type: 'object',
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - User is not authenticated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflict - You never liked this post',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':id/likes'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "unlikePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get total likes for a post',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'UUID of the post to be liked',
        schema: { type: 'string', format: 'uuid' },
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Not Found - Post with given ID does not exist',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        example: { count: 20 },
    }),
    (0, common_1.UseGuards)(optionaljwt_strategy_1.OptionalJwtGuard),
    (0, common_1.Get)(':postId/likes'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getLikes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'comment on a post' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: 'UUID of the post to be liked',
        schema: { type: 'string', format: 'uuid' },
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Post not found' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(':id/comments'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comments_dto_1.CreateCommentDto, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "comment", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':postId/comments'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('postId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comments_dto_1.CreateCommentDto, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Get)(':postId/comments'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('postId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PaginationDTO, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getComments", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':postId/comments'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deleteComment", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(':postId/bookmarks'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "bookmark", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':postId/bookmarks'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "removeBookmark", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':postId/bookmarks'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getBookmark", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiTags)('posts'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService,
        prisma_service_1.PrismaService])
], PostController);
//# sourceMappingURL=post.controller.js.map