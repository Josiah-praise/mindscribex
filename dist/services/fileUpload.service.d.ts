import { ConfigService } from '@nestjs/config';
export declare class FileUploadService {
    private readonly configService;
    private readonly s3Client;
    private readonly bucketName;
    private readonly region;
    private readonly logger;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, uuid: string): Promise<string>;
    generateFileUrl(key: string): string;
    generatePresignedUrl(key: string, expiresIn?: number): Promise<string>;
    private handleUploadError;
    fileExists(key: string): Promise<boolean>;
    generateFileName(userId: string, originalFileName: string): string;
}
