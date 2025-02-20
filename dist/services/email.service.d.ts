import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private readonly URL;
    private readonly MAILGUN_API_KEY;
    private readonly form;
    constructor(configService: ConfigService);
    getFormattedTemplate(path: string, values: {
        [key: string]: any;
    }): Promise<string>;
    sendMail(email: string, formattedTemplate: string, subject: string): Promise<unknown>;
}
