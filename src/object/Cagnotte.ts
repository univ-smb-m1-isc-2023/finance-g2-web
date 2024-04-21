import Compte from './Compte';

export default class Cagnotte {
    private _id: number;
    private _name: string;
    private _description: string;
    private _account: Compte;

    constructor(id: number = 0, name: string = '', description: string = '', account: Compte = new Compte()) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._account = account;
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

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get account(): Compte {
        return this._account;
    }

    public set account(value: Compte) {
        this._account = value;
    }

    public getCagnotte() {
        return this;
    }

    public setCagnotte(cagnotte: Cagnotte) {
        this._id = cagnotte.id;
        this._name = cagnotte.name;
        this._description = cagnotte.description;
        this._account = cagnotte.account;
    }
}
