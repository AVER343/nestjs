"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const constant_1 = require("../../../config/constant");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_service_1 = require("../../user/user.service");
const _email_service_1 = require("./utils/_email.service");
const message_consumer_service_1 = require("./message.consumer.service");
const message_producer_service_1 = require("./message.producer.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let EmailModule = class EmailModule {
};
EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: constant_1.QUEUES.SEND_EMAIL,
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    secret: constant_1.JWT_COOKIE_SECRET,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [],
        providers: [
            _email_service_1.MailingService,
            message_consumer_service_1.MailingConsumerService,
            message_producer_service_1.MailingProducerService,
            prisma_service_1.PrismaService,
            user_service_1.UserService,
        ],
        exports: [_email_service_1.MailingService, message_consumer_service_1.MailingConsumerService, message_producer_service_1.MailingProducerService],
    })
], EmailModule);
exports.EmailModule = EmailModule;
//# sourceMappingURL=email.module.js.map