import { ExecutionContext } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
export declare class OptionalJwtGuard extends JwtGuard {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext): any;
}
