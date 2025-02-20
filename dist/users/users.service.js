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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../services/prisma.service");
const encryption_service_1 = require("../services/encryption.service");
const client_1 = require("@prisma/client");
const fileUpload_service_1 = require("../services/fileUpload.service");
let UsersService = class UsersService {
    constructor(prismaService, fileUploadService, encryptionService) {
        this.prismaService = prismaService;
        this.fileUploadService = fileUploadService;
        this.encryptionService = encryptionService;
    }
    async create(createUserDto) {
        const { email, username, password } = createUserDto;
        const existingUser = await this.prismaService.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            if (existingUser.email === email && existingUser.username === username) {
                throw new common_1.ConflictException('Email and username already associated with an account');
            }
            else if (existingUser.email === email) {
                throw new common_1.ConflictException('Email already associated with an account');
            }
            else {
                throw new common_1.ConflictException('Username already exists');
            }
        }
        const hashedPassword = await this.encryptionService.hashPassword(password);
        return await this.prismaService.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
    }
    async updateUser(userId, updateUserDto) {
        try {
            const user = await this.prismaService.user.update({
                where: {
                    id: userId,
                },
                data: {
                    ...updateUserDto,
                },
            });
            delete user.password;
            return user;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025')
                throw new common_1.NotFoundException("User record doesn't exist");
            throw error;
        }
    }
    async getUserById(userId) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    id: userId,
                },
            });
            delete user.password;
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                message: error.message,
                error: error.code,
            });
        }
    }
    async findAll(page = 1, limit = 15) {
        const total = await this.prismaService.user.count();
        if (!total)
            return {
                data: [],
                meta: {
                    total: 0,
                    page: 0,
                    currPageTotal: 0,
                    limit,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPreviousPage: false,
                },
            };
        if (page < 1)
            page = 1;
        if (limit < 1)
            limit = 15;
        const totalPages = Math.ceil(total / limit);
        page = page > totalPages ? totalPages : page;
        const skip = (page - 1) * limit;
        const users = await this.prismaService.user.findMany({
            skip,
            take: limit,
            orderBy: {
                username: 'asc',
            },
        });
        users.forEach((user) => delete user.password);
        return {
            data: users,
            meta: {
                total,
                page,
                currPageTotal: users.length,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        return user ? user : null;
    }
    async findOne(id) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
        return user ? user : null;
    }
    async deleteUserById(userId) {
        try {
            await this.prismaService.user.delete({ where: { id: userId } });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025')
                throw new common_1.NotFoundException("Post doesn't exist");
            throw error;
        }
    }
    async uploadAvatar(userId, file) {
        return { url: await this.fileUploadService.uploadFile(file, userId) };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        fileUpload_service_1.FileUploadService,
        encryption_service_1.EncryptionService])
], UsersService);
//# sourceMappingURL=users.service.js.map