"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./services/prisma.service");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const users_service_1 = require("./users/users.service");
const redis_service_1 = require("./services/redis.service");
const encryption_service_1 = require("./services/encryption.service");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth/auth.service");
const local_strategy_1 = require("./auth/local.strategy");
const jwt_guard_1 = require("./auth/jwt.guard");
const optionaljwt_strategy_1 = require("./auth/optionaljwt.strategy");
const fileUpload_service_1 = require("./services/fileUpload.service");
let GlobalModule = class GlobalModule {
};
exports.GlobalModule = GlobalModule;
exports.GlobalModule = GlobalModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            jwt_strategy_1.PassportJwtStrategy,
            users_service_1.UsersService,
            redis_service_1.RedisService,
            encryption_service_1.EncryptionService,
            auth_service_1.AuthService,
            local_strategy_1.PassportLocalStrategy,
            jwt_guard_1.JwtGuard,
            optionaljwt_strategy_1.OptionalJwtGuard,
            fileUpload_service_1.FileUploadService,
        ],
        exports: [
            prisma_service_1.PrismaService,
            jwt_strategy_1.PassportJwtStrategy,
            encryption_service_1.EncryptionService,
            users_service_1.UsersService,
            redis_service_1.RedisService,
            auth_service_1.AuthService,
            jwt_1.JwtModule,
            local_strategy_1.PassportLocalStrategy,
            jwt_guard_1.JwtGuard,
            optionaljwt_strategy_1.OptionalJwtGuard,
            fileUpload_service_1.FileUploadService,
        ],
        imports: [jwt_1.JwtModule.register({ secret: '*****' })],
    })
], GlobalModule);
//# sourceMappingURL=global.module.js.map