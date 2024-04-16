export default class Balance {
    private _id: string;
    private _accountId: string;
    private _amount: number;

    constructor(id: string, accountId: string, amount: number) {
        this._id = id;
        this._accountId = accountId;
        this._amount = amount;
    }

    updateAmount(amount: number): void {
        console.log("[Balance] Updating amount", this._accountId, amount);
        this._amount = amount;
    }

    get id(): string {
        return this._id
    }

    get accountId(): string {
        return this._accountId
    }

    get amount(): number {
        return this._amount
    }
}