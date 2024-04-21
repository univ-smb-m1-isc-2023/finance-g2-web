import Cagnotte from './Cagnotte';
import Compte from './Compte';

export default class Depense {
    private _id: number;
    private _amount: number;
    private _transactionDate: string;
    private _tag: Cagnotte;
    private _account: Compte;

    constructor(
        id: number = 0,
        amount: number = 0,
        transactionDate: string = '',
        tag: Cagnotte = new Cagnotte(),
        account: Compte = new Compte(),
    ) {
        this._id = id;
        this._amount = amount;
        this._transactionDate = transactionDate;
        this._tag = tag;
        this._account = account;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get amount(): number {
        return this._amount;
    }

    public set amount(value: number) {
        this._amount = value;
    }

    public get transactionDate(): string {
        return this._transactionDate;
    }

    public set transactionDate(value: string) {
        this._transactionDate = value;
    }

    public get tag(): Cagnotte {
        return this._tag;
    }

    public set tag(value: Cagnotte) {
        this._tag = value;
    }

    public get account(): Compte {
        return this._account;
    }

    public set account(value: Compte) {
        this._account = value;
    }

    public getDepense() {
        return this;
    }

    public setDepense(depense: Depense) {
        this._id = depense.id;
        this._amount = depense.amount;
        this._transactionDate = depense.transactionDate;
        this._tag = depense.tag;
        this._account = depense.account;
    }
}
