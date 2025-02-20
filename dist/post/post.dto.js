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
exports.PaginationWithSearchDTO = exports.PaginationDTO = exports.PaginatedPostResponse = exports.GetPostsResponseDto = exports.CreatePostResponseDto = exports.UpdatePostDto = exports.CreatePostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreatePostDto {
}
exports.CreatePostDto = CreatePostDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Why Cats Lie',
        description: 'The title of the post',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Title must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Title cannot exceed 100 characters' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post content',
        example: 'Cats lie for various reasons, including...',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'Content must be at least 100 characters long' }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'When true, makes an article visible',
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            console.log(value);
            const lowerValue = value.toLowerCase();
            if (lowerValue === 'true')
                return true;
            if (lowerValue === 'false')
                return false;
        }
        return value;
    }),
    __metadata("design:type", Boolean)
], CreatePostDto.prototype, "published", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The time taken to read a post in minutes',
        example: 3,
        minimum: 1,
        default: 2,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Read time must be at least 1 minutes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], CreatePostDto.prototype, "readTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL of the banner image for the post',
        default: 'https://mindsrcibe.s3.amazonaws.com/defaultBanner.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['https'],
        require_protocol: true,
    }),
    __metadata("design:type", String)
], CreatePostDto.prototype, "bannerUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'UUID of the series this post belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePostDto.prototype, "seriesId", void 0);
class UpdatePostDto extends (0, swagger_1.PartialType)(CreatePostDto) {
}
exports.UpdatePostDto = UpdatePostDto;
class CreatePostResponseDto extends CreatePostDto {
}
exports.CreatePostResponseDto = CreatePostResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePostResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreatePostResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreatePostResponseDto.prototype, "updatedAt", void 0);
class Count {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Count.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Count.prototype, "likes", void 0);
class Author {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Author.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Author.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Author.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Author.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Author.prototype, "lastname", void 0);
class GetPostsResponseDto extends CreatePostResponseDto {
}
exports.GetPostsResponseDto = GetPostsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Author)
], GetPostsResponseDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Count)
], GetPostsResponseDto.prototype, "_count", void 0);
class PaginatedPostResponse {
}
exports.PaginatedPostResponse = PaginatedPostResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'An array of posts',
        type: GetPostsResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Array)
], PaginatedPostResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'metadata for pagination',
        example: {
            total: 1000,
            page: 10,
            limit: 10,
            currPageTotal: 10,
            totalPages: 100,
            hasNextPage: true,
            hasPreviousPage: true,
        },
    }),
    __metadata("design:type", Object)
], PaginatedPostResponse.prototype, "meta", void 0);
class PaginationDTO {
}
exports.PaginationDTO = PaginationDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], PaginationDTO.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], PaginationDTO.prototype, "limit", void 0);
class PaginationWithSearchDTO extends PaginationDTO {
}
exports.PaginationWithSearchDTO = PaginationWithSearchDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationWithSearchDTO.prototype, "q", void 0);
//# sourceMappingURL=post.dto.js.map