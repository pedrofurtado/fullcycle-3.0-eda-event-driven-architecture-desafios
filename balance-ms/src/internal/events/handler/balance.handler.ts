import BalanceFactory from "../../entity/balance.factory";
import UpdateBalanceUseCase from "../../usecase/update/update_balance";

export interface EventHandler {
    handle(event: any): Promise<void>
}

type EventData = {
    Payload: {
        account_id_from: string;
        account_id_to: string;
        balance_account_id_from: number;
        balance_account_id_to: number;
    }
}

export class BalanceEventHandler implements EventHandler {

    private readonly _updateBalanceUseCase: UpdateBalanceUseCase;

    constructor(updateBalanceUseCase: UpdateBalanceUseCase) {
        this._updateBalanceUseCase = updateBalanceUseCase;
    }
    
    async handle(event: any): Promise<void> {
        await this.updateBalances(event);
    }

    private async updateBalances(event: EventData) {
        const { 
            account_id_from, 
            balance_account_id_from: balance_from, 
            account_id_to, 
            balance_account_id_to: balance_to 
        } = event.Payload;
        const balanceTo = BalanceFactory.createWith(account_id_to, balance_to);
        const balanceFrom = BalanceFactory.createWith(account_id_from, balance_from);

        await Promise.all([
            this._updateBalanceUseCase.execute(balanceTo),
            this._updateBalanceUseCase.execute(balanceFrom),
        ]);
    }
}