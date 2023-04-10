import { Query, Resolver } from "@nestjs/graphql";
import { AppService } from "./app.service";
import { PORT, NODE_ENV } from "./app.config";

@Resolver()
export class AppResolver {
    constructor(private readonly appService: AppService) { }

    @Query(() => String)
    root() {
        return this.appService.getRootMessage();
    }
}