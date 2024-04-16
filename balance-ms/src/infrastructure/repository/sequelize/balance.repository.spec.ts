import { Sequelize } from "sequelize-typescript";
import BalanceModel from "./balance.model";
import BalanceRepository from "./balance.repository";
import Balance from "../../../internal/entity/balance";

describe("Balance repository test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([BalanceModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a balance", async () => {
        const balanceRepository = new BalanceRepository();
        const balance = new Balance("123", "123", 10);

        await balanceRepository.create(balance);

        const balanceModel = await BalanceModel.findOne({ where: { id: "123" }});

        expect(balanceModel.toJSON()).toStrictEqual({
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        });
    });

    it("should update a balance", async () => {
        const balanceRepository = new BalanceRepository();
        const balance = new Balance("123", "123", 10);

        await balanceRepository.create(balance);

        const balanceModel = await BalanceModel.findOne({ where: { id: "123" }});

        expect(balanceModel.toJSON()).toStrictEqual({
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        });

        balance.updateAmount(30);

        await balanceRepository.update(balance);

        const updatedBalanceModel = await BalanceModel.findOne({ where: { id: "123" }});

        expect(updatedBalanceModel.toJSON()).toStrictEqual({
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        });
    });

    it("should find balance by account id", async () => {
        const balanceRepository = new BalanceRepository();
        
        const balance = new Balance("123", "456", 10);

        await BalanceModel.create({
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        });

        const balanceModel = await balanceRepository.findByAccountId(balance.accountId);

        expect(balanceModel).toStrictEqual(balance);
    });

    it("should thrown an error given an invalid id when find balance by account id", async () => {
        const balanceRepository = new BalanceRepository();
        
        const accountId = "123";

        expect(() => balanceRepository.findByAccountId(accountId))
            .rejects.toThrow(`entity with account Id ${accountId} not found`)
    });
});