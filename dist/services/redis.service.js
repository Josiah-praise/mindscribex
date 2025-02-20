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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
        const redisUrl = configService.get('REDIS_URL');
        this.redis = new ioredis_1.default(redisUrl);
    }
    async isValidToken(token) {
        return (await this.redis.get(token)) === null;
    }
    async invalidateToken(userId, token) {
        const ttl = await this.calculateTtl(token);
        return await this.redis.set(token, userId, 'EX', ttl);
    }
    async calculateTtl(token) {
        const ttl = (await this.jwtService.decode(token).exp) - Math.floor(Date.now() / 1000);
        return ttl;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], RedisService);
//# sourceMappingURL=redis.service.js.map