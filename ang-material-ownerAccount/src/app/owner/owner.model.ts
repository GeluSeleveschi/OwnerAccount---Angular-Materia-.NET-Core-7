import { Account } from "./account.model";

export class Owner {
    ownerId: string;
    name: string;
    dateOfBirth: Date;
    address: string;

    accounts?: Account[];
}