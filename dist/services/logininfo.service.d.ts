import { Request } from 'express';
export declare class UserLoginInfoService {
    private readonly ipInfoUrl;
    extractLoginInfo(req: Request): Promise<{
        ip: string;
        location: string;
        deviceType: string;
        username: string;
        loginTime: string;
    }>;
    private getIpAddress;
    private getLocationFromIp;
    private getDeviceType;
}
