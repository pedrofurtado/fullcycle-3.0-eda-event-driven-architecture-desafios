import Balance from "../../entity/balance";
import BalanceFactory from "../../entity/balance.factory";
import FindBalanceByAccountIdUseCase from "./find_balance_by_account_id";

const getInput = () => ({
    accountId: "123"
});

const balance = new Balance("123", "123", 10);

const MockRepository = () => {
    return {
        findByAccountId: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find by account id use case", () => {
    it("should find a balance by account id", async () => {
        const balanceRepository = MockRepository();
        balanceRepository.findByAccountId.mockResolvedValue(balance);

        const usecase = new FindBalanceByAccountIdUseCase(balanceRepository);
        
        const input = getInput();

        const expectedOutput = {
            id: "123",
            account_id: "123",
            balance: {
                amount: 10
            }
        };

        const result = await usecase.execute(input);

        expect(result).toBeDefined();
        expect(result).toStrictEqual(expectedOutput);
    });
    it("should not find a balance", async () => {
        const balanceRepository = MockRepository();
        balanceRepository.findByAccountId.mockImplementation(() => {
            throw new Error("balance for account id 123 not found");
        });

        const usecase = new FindBalanceByAccountIdUseCase(balanceRepository);

        const input = getInput();

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("balance for account id 123 not found");
    })
});