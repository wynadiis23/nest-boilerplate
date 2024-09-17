"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const logger = new common_1.Logger('Swagger');
    const port = process.env.PORT || 3000;
    const documentBuilder = new swagger_1.DocumentBuilder()
        .setTitle('Travela API')
        .setDescription(`REST API Documentation for Travela`)
        .addBearerAuth()
        .setVersion('1.0');
    const document = swagger_1.SwaggerModule.createDocument(app, documentBuilder.build());
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    logger.log(`Documentation: http://localhost:${port}/docs`);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map