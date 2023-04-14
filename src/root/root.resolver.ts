import { Query, Resolver } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { RootService } from "./root.service";

@Resolver()
export class RootResolver {
    @Inject(RootService)
    private rootService: RootService;

    @Query(() => String)
    root() {
        return this.rootService.getRootMessage();
    }
}