"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginInfoService = void 0;
const common_1 = require("@nestjs/common");
const UAParser = require("ua-parser-js");
const axios_1 = require("axios");
let UserLoginInfoService = class UserLoginInfoService {
    constructor() {
        this.ipInfoUrl = 'https://ipinfo.io';
    }
    async extractLoginInfo(req) {
        const ip = this.getIpAddress(req);
        const location = await this.getLocationFromIp(ip);
        const deviceType = this.getDeviceType(req);
        const username = req.user.firstname + ' ' + req.user.lastname;
        const loginTime = new Date().toLocaleString() + '(UTC)';
        return {
            ip,
            location,
            deviceType,
            username,
            loginTime,
        };
    }
    getIpAddress(req) {
        const forwarded = req.headers['x-forwarded-for'];
        const ip = typeof forwarded === 'string'
            ? forwarded.split(',')[0]
            : req.socket.remoteAddress;
        return ip || 'Unknown IP';
    }
    async getLocationFromIp(ip) {
        try {
            const response = await axios_1.default.get(`${this.ipInfoUrl}/${ip}/json`);
            const { city, region, country } = response.data;
            return `${city}, ${region}, ${country}`;
        }
        catch (error) {
            console.error('Error fetching location data:', error);
            return 'Unknown Location';
        }
    }
    getDeviceType(req) {
        const userAgent = req.headers['user-agent'] || '';
        const parser = new UAParser(userAgent);
        const device = parser.getDevice();
        return device.type
            ? `${device.type} (${parser.getOS().name})`
            : `Desktop (${parser.getOS().name})`;
    }
};
exports.UserLoginInfoService = UserLoginInfoService;
exports.UserLoginInfoService = UserLoginInfoService = __decorate([
    (0, common_1.Injectable)()
], UserLoginInfoService);
//# sourceMappingURL=logininfo.service.js.map