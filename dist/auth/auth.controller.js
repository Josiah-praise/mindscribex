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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const auth_service_1 = require("./auth.service");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_guard_1 = require("./jwt.guard");
const redis_service_1 = require("../services/redis.service");
const swagger_1 = require("@nestjs/swagger");
const utilities_1 = require("../utilities");
const signup_return_dto_1 = require("./dto/signup.return.dto");
const signin_dto_1 = require("./dto/signin.dto");
const logininfo_service_1 = require("../services/logininfo.service");
const email_service_1 = require("../services/email.service");
let AuthController = class AuthController {
    constructor(authService, jwtService, configService, redisService, userLoginInfoService, emailService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.redisService = redisService;
        this.userLoginInfoService = userLoginInfoService;
        this.emailService = emailService;
    }
    async signUp(createUserDto) {
        const user = await this.authService.createAccount(createUserDto);
        const payload = { id: user.id, email: user.email };
        delete user.password;
        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: '7d',
                secret: this.configService.get('SECRET'),
            }),
            user,
        };
    }
    async login(req) {
        const user = req.user;
        const payload = { id: user.id, email: user.email };
        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: '7d',
                secret: this.configService.get('SECRET'),
            }),
            user: req.user,
        };
    }
    async logout(req) {
        const token = req.headers.authorization.split(' ')[1];
        const userId = req.user.id;
        await this.redisService.invalidateToken(userId, token);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'User registration',
        description: 'Create a new user account and return access token along with user details',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User created successfully',
        type: signup_return_dto_1.SignupReturnDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request - Invalid input',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                    example: [
                        'Password is too weak. It must include uppercase and lowercase letters, numbers, and special characters.',
                        'Email must be a valid email address',
                    ],
                },
                error: {
                    type: 'string',
                    example: 'Bad Request',
                },
                statusCode: {
                    type: 'number',
                    example: 400,
                },
            },
        },
    }),
    (0, swagger_1.ApiConflictResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Conflict - Email already exists/User already exists/Username already taken')),
    (0, swagger_1.ApiInternalServerErrorResponse)((0, utilities_1.ApiResponseOptionsGenerator)('Internal server error')),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'User login',
        description: 'Authenticate a user and return a JWT access token',
    }),
    (0, swagger_1.ApiBody)({
        type: signin_dto_1.SignInDto,
        description: 'User credentials',
        examples: {
            userCredentials: {
                summary: 'User Credentials Example',
                value: {
                    email: 'user@example.com',
                    password: 'password123',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully authenticated',
        schema: {
            type: 'object',
            properties: {
                accessToken: {
                    type: 'string',
                    description: 'JWT token that expires in 7 days',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
                user: {
                    type: 'SignupReturnDto',
                },
            },
        },
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Invalid credentials',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid request body',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal server error',
    }),
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Logout user',
        description: 'Invalidates the current JWT token by adding it to a blocklist in Redis',
    }),
    (0, swagger_1.ApiNoContentResponse)({
        description: 'Successfully logged out',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized - token is already invalid. No need to logout. Just Sign In afresh',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal server error',
    }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer JWT token',
        required: true,
        schema: {
            type: 'string',
            example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_2.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService,
        config_1.ConfigService,
        redis_service_1.RedisService,
        logininfo_service_1.UserLoginInfoService,
        email_service_1.EmailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map