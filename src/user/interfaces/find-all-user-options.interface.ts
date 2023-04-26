import { FindAllInputOptions } from "../../global/interfaces/find-all-input-options.interface";

export interface FindAllUserOptions extends FindAllInputOptions {
    roleId?: string;
}