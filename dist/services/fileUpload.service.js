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
var FileUploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = require("@nestjs/config");
const path = require("path");
const date_fns_1 = require("date-fns");
let FileUploadService = FileUploadService_1 = class FileUploadService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(FileUploadService_1.name);
        this.region = this.configService.getOrThrow('AWS_S3_REGION');
        this.bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
        this.s3Client = new client_s3_1.S3Client({
            region: this.region,
            credentials: {
                accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }
    async uploadFile(file, uuid) {
        try {
            const key = this.generateFileName(uuid, file.originalname);
            console.log(key);
            const params = {
                Bucket: this.bucketName,
                Key: `${key}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                Metadata: {
                    originalName: file.originalname,
                },
            };
            const command = new client_s3_1.PutObjectCommand(params);
            await this.s3Client.send(command);
            return this.generateFileUrl(key);
        }
        catch (error) {
            this.handleUploadError(error, file.originalname);
        }
    }
    generateFileUrl(key) {
        return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
    }
    async generatePresignedUrl(key, expiresIn = 3600) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
    }
    handleUploadError(error, filename) {
        this.logger.error(`Failed to upload file ${filename}`, error);
        if (error instanceof client_s3_1.S3ServiceException) {
            throw new common_1.InternalServerErrorException({
                message: 'Failed to upload file to S3',
                error: error.message,
            });
        }
        throw new common_1.InternalServerErrorException('An unexpected error occurred during file upload');
    }
    async fileExists(key) {
        try {
            await this.s3Client.send(new client_s3_1.GetObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            }));
            return true;
        }
        catch (error) {
            if (error instanceof client_s3_1.S3ServiceException &&
                error.$metadata.httpStatusCode === 404) {
                return false;
            }
            throw error;
        }
    }
    generateFileName(userId, originalFileName) {
        const date = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
        const sanitizedFileName = path
            .parse(originalFileName)
            .name.replace(/\s+/g, '_');
        const fileExtension = path.extname(originalFileName);
        return `mindscribe/${userId}/${date}_${sanitizedFileName}${fileExtension}`;
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = FileUploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileUploadService);
//# sourceMappingURL=fileUpload.service.js.map