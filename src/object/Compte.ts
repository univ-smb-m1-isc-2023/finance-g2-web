export default class Compte {
    private _id: number;
    private _accountName: string;
    private _balance: number;
    constructor(id: number = 0, accountName: string = '', balance: number = 0) {
        this._id = id;
        this._accountName = accountName;
        this._balance = balance;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get accountName(): string {
        return this._accountName;
    }

    public set accountName(value: string) {
        this._accountName = value;
    }

    public get balance(): number {
        return this._balance;
    }

    public set balance(value: number) {
        this._balance = value;
    }

    public getAccount() {
        return this;
    }

    public setAccount(compte: Compte) {
        this._id = compte.id;
        this._accountName = compte.accountName;
        this._balance = compte.balance;
    }
}
