"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const compression = require("compression");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mindscribe')
        .setDescription('A description of the MindScribe API')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('mindscribe')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    const frontendDomain = configService.get('FRONTEND_DOMAIN') || '*';
    const isProduction = configService.get('NODE_ENV') === 'production';
    app.use((0, helmet_1.default)({
        crossOriginEmbedderPolicy: !isProduction,
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'https:'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    }));
    app.use(compression({
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression.filter(req, res);
        },
        level: 6,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        validationError: {
            value: true,
        },
    }));
    app.enableCors({
        origin: frontendDomain,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Authorization',
        ],
        credentials: true,
        maxAge: 3600,
    });
    if (isProduction) {
        app.set('trust proxy', 1);
    }
    await app.listen(port || 3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log(`Swagger documentation available at: ${await app.getUrl()}/api`);
}
bootstrap().catch((error) => {
    new common_1.Logger('Bootstrap').error('Failed to start application', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map