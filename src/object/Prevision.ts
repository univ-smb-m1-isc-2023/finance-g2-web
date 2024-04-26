import Cagnotte from './Cagnotte';
import Compte from './Compte';

export default class Prevision {
    private _id: number;
    private _name: string;
    private _amount: number;
    private _month: number;
    private _year: number;
    private _tag: Cagnotte;
    private _account: Compte;
    private _type: string;
    private _date: string;

    constructor(
        id: number = 0,
        name: string = '',
        amount: number = 0,
        month: number = 0,
        year: number = 0,
        tag: Cagnotte = new Cagnotte(),
        account: Compte = new Compte(),
        type: string = '',
    ) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._month = month;
        this._year = year;
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

    public get date(): string {
        return this._date;
    }

    public set date(value: string) {
        this._date = value;
    }

    public get month(): number {
        return this._month;
    }

    public set month(value: number) {
        this._month = value;
    }

    public get year(): number {
        return this._year;
    }

    public set year(value: number) {
        this._year = value;
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

    public getPrevision() {
        return this;
    }

    public setPrevision(prevision: Prevision) {
        this._id = prevision.id;
        this._amount = prevision.amount;
        this._month = prevision.month;
        this._year = prevision.year;
        this._tag = prevision.tag;
        this._account = prevision.account;
        this._type = prevision.type;
    }
}
