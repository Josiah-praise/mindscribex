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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const handlebars_1 = require("handlebars");
const fs = require("fs/promises");
const undici_1 = require("undici");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.URL = this.configService.getOrThrow('MAILGUN_URL');
        this.MAILGUN_API_KEY = this.configService.getOrThrow('MAILGUN_API_KEY');
        this.form = new undici_1.FormData();
    }
    async getFormattedTemplate(path, values) {
        const fileContent = await fs.readFile(path, 'utf-8');
        const template = handlebars_1.default.compile(fileContent);
        const formattedTemplate = template(values);
        return formattedTemplate;
    }
    async sendMail(email, formattedTemplate, subject) {
        try {
            this.form.append('from', '<noreply@mail.praiseafk.tech>');
            this.form.append('to', email);
            this.form.append('subject', subject);
            this.form.append('text', formattedTemplate);
            this.form.append('html', formattedTemplate);
            const resp = await (0, undici_1.fetch)(this.URL, {
                method: 'POST',
                headers: {
                    Authorization: 'Basic ' +
                        Buffer.from(`api:${this.configService.getOrThrow('MAILGUN_API_KEY')}`).toString('base64'),
                },
                body: this.form,
            });
            if (resp.ok) {
                return await resp.json();
            }
            else {
                throw new Error('Email not sent successfully');
            }
        }
        catch (err) {
            throw new common_1.ServiceUnavailableException({
                message: 'Error in sending email',
                error: err.message,
            });
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map