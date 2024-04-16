import Balance from "../entity/balance";

export default interface BalanceGateway {
    findByAccountId(id: String): Promise<Balance>;
    create(balance: Balance): Promise<void>;
    update(balance: Balance): Promise<void>;
}