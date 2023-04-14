import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
    getRootMessage() {
        return 'NestJS GraphQL';
    }
}
