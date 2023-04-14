import { Module } from "@nestjs/common";
import { RootService } from "./root.service";
import { RootResolver } from "./root.resolver";

@Module({
    providers: [RootService, RootResolver],
})
export class RootModule { }