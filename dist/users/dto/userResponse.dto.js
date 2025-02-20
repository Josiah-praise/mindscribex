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
exports.PaginatedUsersDto = exports.PaginationMetaDataDto = exports.UserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_1 = require("../../entities/user");
class UserResponseDto extends (0, swagger_1.OmitType)(user_1.User, [
    'password',
]) {
}
exports.UserResponseDto = UserResponseDto;
class PaginationMetaDataDto {
}
exports.PaginationMetaDataDto = PaginationMetaDataDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDataDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDataDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDataDto.prototype, "currPageTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDataDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDataDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PaginationMetaDataDto.prototype, "hasNextPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PaginationMetaDataDto.prototype, "hasPreviousPage", void 0);
class PaginatedUsersDto {
}
exports.PaginatedUsersDto = PaginatedUsersDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: UserResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Array)
], PaginatedUsersDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PaginationMetaDataDto)
], PaginatedUsersDto.prototype, "meta", void 0);
//# sourceMappingURL=userResponse.dto.js.map