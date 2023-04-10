import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NODE_ENV, PORT } from './app.config';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getRootMessage() {
        return {
            message: this.appService.getRootMessage(),
            data: {
                port: PORT,
                environment: NODE_ENV,
            }
        };
    }
}
