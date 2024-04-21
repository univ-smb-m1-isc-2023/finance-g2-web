import Cagnotte from './Cagnotte';
import Compte from './Compte';

export default class Transaction {
    private _id: number;
    private _name: string;
    private _amount: number;
    private _transactionDate: string;
    private _tag: Cagnotte;
    private _account: Compte;
    private _type: string;

    constructor(
        id: number = 0,
        name: string = '',
        amount: number = 0,
        transactionDate: string = '',
        tag: Cagnotte = new Cagnotte(),
        account: Compte = new Compte(),
        type: string = '',
    ) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._transactionDate = transactionDate;
        this._tag = tag;
        this._account = account;
        this._type = type;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get type(): string {
        return this._type;
    }

    public set type(value: string) {
        this._type = value;
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

    public getTransaction() {
        return this;
    }

    public setTransaction(transaction: Transaction) {
        this._id = transaction.id;
        this._name = transaction.name;
        this._amount = transaction.amount;
        this._transactionDate = transaction.transactionDate;
        this._tag = transaction.tag;
        this._account = transaction.account;
        this._type = transaction.type;
    }
}
