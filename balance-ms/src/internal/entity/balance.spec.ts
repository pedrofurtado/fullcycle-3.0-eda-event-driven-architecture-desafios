import Balance from "./balance"

describe("Balance unit tests", () => {
    it("should create balance successfully", () => {
        const balance = new Balance("123", "123", 10);
        expect(balance).toBeDefined();
        expect(balance.id).toEqual("123");
        expect(balance.accountId).toEqual("123");
        expect(balance.amount).toEqual(10)
    });

    it("should update balance amount", () => {
        const balance = new Balance("123", "123", 10);
        balance.updateAmount(20);

        expect(balance.amount).toEqual(20);
    });
})