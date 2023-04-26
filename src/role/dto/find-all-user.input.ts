import { InputType } from "@nestjs/graphql";
import { FindAllInput } from "../../global/dto/find-all-input.dto";

@InputType()
export class FindAllRoleInput extends FindAllInput { }