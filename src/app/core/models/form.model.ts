import { MyStatus } from "./status.model";

export interface MyForm<T>
{
    data : T,
    status : MyStatus
}