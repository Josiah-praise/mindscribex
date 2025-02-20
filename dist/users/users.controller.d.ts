import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { PrismaService } from 'src/services/prisma.service';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
import { UsersService } from './users.service';
import { PaginationDTO } from 'src/post/post.dto';
export declare class UsersController {
    private readonly prismaService;
    private readonly userService;
    constructor(prismaService: PrismaService, userService: UsersService);
    updateUser(id: string, updateUserDto: UpdateUserDto, req: Request): Promise<UserResponseDto>;
    getUserById(id: string): Promise<{
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        id: string;
        avatarUrl: string | null;
        xLink: string | null;
        youtubeLink: string | null;
        facebookLink: string | null;
        instagramLink: string | null;
        twitchLink: string | null;
        isValid: boolean;
        createdAt: Date;
        updatedAt: Date;
        isStaff: boolean;
        isSuperUser: boolean;
    }>;
    getUsers(paginationDTO: PaginationDTO): Promise<{
        data: {
            username: string;
            firstname: string;
            lastname: string;
            email: string;
            password: string;
            id: string;
            avatarUrl: string | null;
            xLink: string | null;
            youtubeLink: string | null;
            facebookLink: string | null;
            instagramLink: string | null;
            twitchLink: string | null;
            isValid: boolean;
            createdAt: Date;
            updatedAt: Date;
            isStaff: boolean;
            isSuperUser: boolean;
        }[];
        meta: {
            total: number;
            page: number;
            currPageTotal: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    deleteUserById(req: Request, userId: any): Promise<void>;
    uploadAvatar(req: Request, file: Express.Multer.File): any;
}
