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
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_user_dto_1 = require("./create-user.dto");
class UpdateUserDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_user_dto_1.CreateUserDto, ['password', 'email'])) {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://storage.com/avatar.png',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['http', 'https'],
        require_protocol: false,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://x.com/xyz',
        description: `Host whitelist: x.com and twitter.com
    Protocols allowed and required:  ['https', 'http']
    `,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['http', 'https'],
        require_protocol: false,
        host_whitelist: ['x.com', 'twitter.com'],
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "xLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://youtube.com/xyz',
        description: `Host whitelist: youtube.com and youtu.be
    Protocols allowed and required:  ['https', 'http']
    `,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['http', 'https'],
        require_protocol: true,
        host_whitelist: ['youtube.com', 'youtu.be'],
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "youtubeLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://facebook.com/xyz',
        description: `Host whitelist: facebook.com
    Protocols allowed and required:  ['https', 'http']
    `,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['http', 'https'],
        require_protocol: true,
        host_whitelist: ['facebook.com'],
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "facebookLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://instagram.com/xyz',
        description: `Host whitelist: instagram.com
    Protocols allowed and required:  ['https', 'http']
    `,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['http', 'https'],
        require_protocol: true,
        host_whitelist: ['instagram.com'],
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "instagramLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://twitch.tv/xyz',
        description: `Host whitelist: twitch.tv
    Protocols allowed and required:  ['https', 'http']
    `,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({
        protocols: ['http', 'https'],
        require_protocol: true,
        host_whitelist: ['twitch.tv'],
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "twitchLink", void 0);
//# sourceMappingURL=update-user.dto.js.map