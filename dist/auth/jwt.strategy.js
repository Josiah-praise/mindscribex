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
exports.PassportJwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_2 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const redis_service_1 = require("../services/redis.service");
let PassportJwtStrategy = class PassportJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, usersService, redisService) {
        super({
            jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('SECRET'),
            passReqToCallback: true,
        });
        this.configService = configService;
        this.usersService = usersService;
        this.redisService = redisService;
    }
    async validate(req, payload) {
        const token = req.headers.authorization.split(' ')[1];
        if (!(await this.redisService.isValidToken(token)))
            throw new common_1.UnauthorizedException();
        const email = payload.email;
        const user = await this.usersService.findByEmail(email);
        if (user) {
            delete user.password;
            return user;
        }
        throw new common_1.UnauthorizedException();
    }
};
exports.PassportJwtStrategy = PassportJwtStrategy;
exports.PassportJwtStrategy = PassportJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService,
        redis_service_1.RedisService])
], PassportJwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map