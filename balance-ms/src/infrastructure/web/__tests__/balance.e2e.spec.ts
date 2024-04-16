import Balance from "../../../internal/entity/balance";
import BalanceModel from "../../repository/sequelize/balance.model";
import { sequelize, setupDb } from "../../repository/sequelize/setup";
import { app } from "../express";
import request from "supertest";
import { listen } from "../server";

const newBalance = () => new Balance("123", "456", 10);

describe("E2E test for balance", () => {
  beforeAll(async () => {
    await setupDb();
    listen();
  });
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it("should find balance by id account id", async () => {
    await persistBalance();

    const balance = newBalance();

    const response = await request(app)
      .get(`/balances/${balance.accountId}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(balance.id);
    expect(response.body.account_id).toBe(balance.accountId);
    expect(response.body.balance.amount).toBe(balance.amount);
  });

  it("should not find a balance by account id", async () => {
    await persistBalance();

    const accountId = expect.any(String());

    const response = await request(app).get(`/balances/${accountId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      `entity with account Id ${accountId} not found`
    );
  });
});

async function persistBalance() {
  const balance = newBalance();

  await BalanceModel.create({
    id: balance.id,
    accountId: balance.accountId,
    amount: balance.amount,
  });
}
