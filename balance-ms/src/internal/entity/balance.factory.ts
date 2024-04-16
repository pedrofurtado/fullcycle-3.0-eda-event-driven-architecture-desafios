import Balance from "./balance";
import {v4 as uuid} from "uuid";

export default class BalanceFactory {
    public static create(accountId: string): Balance {
        return new Balance(uuid(), accountId, 0);
    }

    public static createWith(accountId: string, amount: number): Balance {
        return new Balance(uuid(), accountId, amount);
    }
}