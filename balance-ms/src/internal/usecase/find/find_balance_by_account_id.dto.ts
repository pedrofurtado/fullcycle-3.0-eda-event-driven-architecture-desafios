export interface InputFindBalanceByAccountIdDto {
    accountId: string
}

export interface OutputFindBalanceByAccountIdDto {
    id: string;
    account_id: string;
    balance: {
        amount: number;
    };
}