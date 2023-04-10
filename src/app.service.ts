import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getRootMessage() {
        return 'NestJS GraphQL';
    }
}
