"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const http_filter_exception_1 = require("./common/exceptions/http-filter.exception");
const setup_swagger_1 = require("./setup-swagger");
const nestjs_pino_1 = require("nestjs-pino");
async function bootstrap() {
    const port = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true,
    }));
    app.setGlobalPrefix('api', {
        exclude: ['/'],
    });
    app.use(express.urlencoded({
        extended: true,
    }));
    const configService = app.get(config_1.ConfigService);
    const APP_FRONTEND_DOMAIN = configService.get('APP_FRONT_END_DOMAIN');
    const whitelistDomain = APP_FRONTEND_DOMAIN == '*' ? '*' : APP_FRONTEND_DOMAIN.split(',');
    const httpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new http_filter_exception_1.HttpExceptionFilter(httpAdapterHost));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.enableCors({
        origin: whitelistDomain,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
    });
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
    (0, setup_swagger_1.setupSwagger)(app);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map