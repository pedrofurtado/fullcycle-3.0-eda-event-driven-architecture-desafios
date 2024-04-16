
import Balance from "../../entity/balance";
import BalanceFactory from "../../entity/balance.factory";
import BalanceNotFoundError from "../../exception/balance_not_found.error";
import BalanceGateway from "../../gateway/balance_gateway";
import { UseCase } from "../usecase.interface";
import { InputUpdateBalanceDto, OutputUpdateBalanceDto } from "./update_balance.dto";

export default class UpdateBalanceUseCase 
    implements UseCase<InputUpdateBalanceDto, OutputUpdateBalanceDto> {
    private readonly _balanceGateway: BalanceGateway

    constructor(balanceGateway: BalanceGateway) {
        this._balanceGateway = balanceGateway;
    }

    async execute(input: InputUpdateBalanceDto): Promise<OutputUpdateBalanceDto>  {
        let balance: Balance;
        try {
            console.log("[UpdateBalanceUseCase] query for account id ", input.accountId);
            balance = await this._balanceGateway.findByAccountId(input.accountId);
            console.log("[UpdateBalanceUseCase] found balance id ", balance.id);
            balance.updateAmount(input.amount);
            await this._balanceGateway.update(balance);
            console.log("[UpdateBalanceUseCase] balance updated", balance);
        } catch (error) {
            if (error instanceof BalanceNotFoundError) {
                console.log("[UpdateBalanceUseCase] account id not found", input.accountId)
                balance = await this.saveBalance(input);
                console.log("[UpdateBalanceUseCase] balance created", balance);
            } else {
                console.error("[UpdateBalanceUseCase] error while updating/creating balance ", error);
                throw error;
            }
        }

        return {
            id: balance.id,
            accountId: balance.accountId,
            amount: balance.amount
        }
    }

    private async saveBalance(input: InputUpdateBalanceDto) {
        const balance = BalanceFactory.createWith(input.accountId, input.amount);
        await this._balanceGateway.create(balance);
        return balance;
    }
}