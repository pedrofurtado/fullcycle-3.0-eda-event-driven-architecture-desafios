
import BalanceFactory from "../../entity/balance.factory";
import BalanceNotFoundError from "../../exception/balance_not_found.error";
import UpdateBalanceUseCase from "./update_balance";

const balance = BalanceFactory.create("123");

const getInput = () => ({
    accountId: balance.accountId,
    amount: balance.amount
});

const mockRepository = () => {
    return {
        findByAccountId: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test update balance use case", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should update balance given an account exists",async () => {
        const input = getInput();
        const balanceRepository = mockRepository();

        const findByAccountIdSpy = jest
            .spyOn(balanceRepository, "findByAccountId")
            .mockReturnValue(Promise.resolve(balance));

        const updateSpy = jest.spyOn(balanceRepository, "update");

        const updateBalanceUseCase = new UpdateBalanceUseCase(balanceRepository);

        const output = await updateBalanceUseCase.execute(input);
        
        expect(output).toBeDefined();
        expect(output.accountId).toEqual(balance.accountId);
        expect(output.amount).toEqual(balance.amount);
        expect(findByAccountIdSpy).toHaveBeenCalledWith(balance.accountId);
        expect(updateSpy).toHaveBeenCalledWith(balance);
    });

    it("should update balance given an does not exists",async () => {
        const input = getInput();
        const balanceRepository = mockRepository();

        const findByAccountIdSpy = jest
            .spyOn(balanceRepository, "findByAccountId")
            .mockRejectedValue(new BalanceNotFoundError());

        const createSpy = jest.spyOn(balanceRepository, "create");

        const updateBalanceUseCase = new UpdateBalanceUseCase(balanceRepository);

        const output = await updateBalanceUseCase.execute(input);
        
        expect(output).toBeDefined();
        expect(output.accountId).toEqual(balance.accountId);
        expect(output.amount).toEqual(balance.amount);
        expect(findByAccountIdSpy).toHaveBeenCalledWith(balance.accountId);
        expect(createSpy).toBeCalledTimes(1);
    });
});