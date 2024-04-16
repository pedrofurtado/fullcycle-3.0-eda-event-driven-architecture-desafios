import UpdateBalanceUseCase from "../../usecase/update/update_balance";
import { BalanceEventHandler } from "./balance.handler";

jest.mock("./../../usecase/update/update_balance");

const mockGateway = () => {
  return {
    findByAccountId: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  };
};

const getEvent = () => ({
    Payload: {
        account_id_to: "123",
        balance_account_id_to: 10,
        account_id_from: "234",
        balance_account_id_from: 20,
        }
});

describe("Balance handler unit test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle event", async () => {
    const event = getEvent();
    const mockBalanceGateway = mockGateway();
    const mockUpdateBalanceUseCase = new (UpdateBalanceUseCase as jest.MockedClass<typeof UpdateBalanceUseCase>)(mockBalanceGateway);

    const executeSpy = jest.spyOn(mockUpdateBalanceUseCase, "execute");

    const handler = new BalanceEventHandler(mockUpdateBalanceUseCase);

    await handler.handle(event);

    expect(executeSpy).toBeCalledTimes(2);
  });
});
