import express, { Request, Response } from "express";
import FindBalanceByAccountIdUseCase from "../../../internal/usecase/find/find_balance_by_account_id";
import BalanceRepository from "../../repository/sequelize/balance.repository";
import BalanceNotFoundError from "../../../internal/exception/balance_not_found.error";

export const balanceRoute = express.Router();

balanceRoute.get("/:account_id", async (req: Request, res: Response) => {
    const usecase = new FindBalanceByAccountIdUseCase(new BalanceRepository());
    try {
        const accountId = req.params.account_id;
        const output = await usecase.execute({ accountId });
        res.status(200).send(output);
    } catch (error) {
        if (error instanceof BalanceNotFoundError) {
            res.status(404).send({
                message: error.message
            })
        } else {
            res.status(500).send({
                message: "unexpected error"
            });
        }
    }
});