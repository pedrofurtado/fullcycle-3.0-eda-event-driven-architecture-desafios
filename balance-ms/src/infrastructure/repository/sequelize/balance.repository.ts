import Balance from "../../../internal/entity/balance";
import BalanceNotFoundError from "../../../internal/exception/balance_not_found.error";
import BalanceGateway from "../../../internal/gateway/balance_gateway";
import BalanceModel from "./balance.model";

export default class BalanceRepository implements BalanceGateway {
    
    async findByAccountId(id: String): Promise<Balance> {
        try {
            const balanceModel = await BalanceModel.findOne({
                where: {
                    accountId: id
                },
                rejectOnEmpty: true,
            });
            return new Balance(balanceModel.id, balanceModel.accountId, balanceModel.amount);
        } catch (error) {
            throw new BalanceNotFoundError(`entity with account Id ${id} not found`);
        }
    }

    async create(entity: Balance): Promise<void> {
        await BalanceModel.create({
            id: entity.id,
            accountId: entity.accountId,
            amount: entity.amount
        });

    }

    async update(entity: Balance): Promise<void> {
        await BalanceModel.update({
            accountId: entity.accountId,
            amount: entity.amount
        }, 
        {
            where: {
                id: entity.id
            }
        });
    }

}