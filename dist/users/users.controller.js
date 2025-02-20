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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const update_user_dto_1 = require("./dto/update-user.dto");
const prisma_service_1 = require("../services/prisma.service");
const swagger_1 = require("@nestjs/swagger");
const utilities_1 = require("../utilities");
const userResponse_dto_1 = require("./dto/userResponse.dto");
const users_service_1 = require("./users.service");
const platform_express_1 = require("@nestjs/platform-express");
const post_dto_1 = require("../post/post.dto");
let UsersController = class UsersController {
    constructor(prismaService, userService) {
        this.prismaService = prismaService;
        this.userService = userService;
    }
    async updateUser(id, updateUserDto, req) {
        if (id !== req.user.id)
            throw new common_1.ForbiddenException();
        return await this.userService.updateUser(id, updateUserDto);
    }
    async getUserById(id) {
        return await this.userService.getUserById(id);
    }
    async getUsers(paginationDTO) {
        return await this.userService.findAll(paginationDTO.page, paginationDTO.limit);
    }
    async deleteUserById(req, userId) {
        if (userId !== req.user.id)
            throw new common_1.ForbiddenException();
        await this.userService.deleteUserById(req.user.id);
    }
    async uploadAvatar(req, file) {
        return await this.uploadAvatar(req.user.id, file);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'For updating existing users',
        description: 'gets users details and updates them',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized request',
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'User does not have permission to update this resource',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'User not found',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid request payload or parameter',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'UUID of the user to be updated',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiBody)({
        description: 'The credentials of the user to be updated',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Unexpected error on the server',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User successfully updated',
        type: userResponse_dto_1.UserResponseDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiInternalServerErrorResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Internal server error')),
    (0, swagger_1.ApiNotFoundResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Resource not found')),
    (0, swagger_1.ApiBadRequestResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Bad request')),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successful request',
        type: userResponse_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'User UUID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get User by UUID',
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'page',
        description: 'page number',
        example: 3,
        type: Number,
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        description: 'users per page',
        example: 3,
        type: Number,
        required: false,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all Users',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successful request',
        type: userResponse_dto_1.PaginatedUsersDto,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Internal server error')),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PaginationDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Unauthorized')),
    (0, swagger_1.ApiForbiddenResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Forbidden')),
    (0, swagger_1.ApiNotFoundResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Resource not found')),
    (0, swagger_1.ApiBadRequestResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Bad Request')),
    (0, swagger_1.ApiNoContentResponse)((0, utilities_1.ApiResponseOptionsGenerator)('No content')),
    (0, swagger_1.ApiInternalServerErrorResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Internal server error')),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'User UUID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete User by UUID',
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Patch)('me/avatar'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1000 * 1000 * 5 }),
            new common_1.FileTypeValidator({ fileType: /image\/(jpeg|png)/ }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadAvatar", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map