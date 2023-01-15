import { Account } from "./account.model";

export interface Owner {
    ownerId: string;
    name: string;
    dateOfBirth: Date;
    address: string;

    accounts?: Account[];
}