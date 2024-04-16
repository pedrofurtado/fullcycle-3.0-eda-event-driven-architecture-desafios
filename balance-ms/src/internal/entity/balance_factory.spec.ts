import BalanceFactory from "./balance.factory";

describe("balance factory unit test", () => {
    it("should create a balance", () => {
        const balance = BalanceFactory.create("123");
        expect(balance).toBeDefined();
        expect(balance.id).toBeDefined();
        expect(balance.accountId).toEqual("123");
        expect(balance.amount).toEqual(0);
    });

    it("should create a balance with accountId and amount", () => {
        const balance = BalanceFactory.createWith("123", 10);
        expect(balance).toBeDefined();
        expect(balance.id).toBeDefined();
        expect(balance.accountId).toEqual("123");
        expect(balance.amount).toEqual(10);
    })
});