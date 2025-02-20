import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { EncryptionService } from 'src/services/encryption.service';
import { User } from 'src/entities/user';
import { FileUploadService } from 'src/services/fileUpload.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prismaService;
    private readonly fileUploadService;
    private readonly encryptionService;
    constructor(prismaService: PrismaService, fileUploadService: FileUploadService, encryptionService: EncryptionService);
    create(createUserDto: CreateUserDto): Promise<User>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<{
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
    getUserById(userId: any): Promise<{
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
    findAll(page?: number, limit?: number): Promise<{
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
    findByEmail(email: string): Promise<User | null>;
    findOne(id: string): Promise<User | null>;
    deleteUserById(userId: any): Promise<void>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
