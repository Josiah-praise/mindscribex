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
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcryptjs_1 = require("bcryptjs");
let EncryptionService = class EncryptionService {
    constructor(configService) {
        this.configService = configService;
    }
    async hashPassword(password) {
        try {
            const salt = await (0, bcryptjs_1.genSalt)(parseInt(this.configService.get('SALT')) || 10);
            const $hash = await (0, bcryptjs_1.hash)(password, salt);
            return $hash;
        }
        catch (error) {
            console.error('Password hashing error:', error);
            throw new common_1.InternalServerErrorException('Error hashing password');
        }
    }
    async checkPassword(password, hash) {
        try {
            return await (0, bcryptjs_1.compare)(password, hash);
        }
        catch (error) {
            console.error('Password comparison error:', error);
            throw new common_1.InternalServerErrorException('Error comparing passwords');
        }
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map