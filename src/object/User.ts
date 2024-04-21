export default class User {
    static _instance: User;

    public _id: number;
    public _username: string;
    public _fullName: string;
    public _email: string;

    constructor(id: number = 0, username: string = '', fullName: string = '', email: string = '') {
        this._id = id;
        this._username = username;
        this._fullName = fullName;
        this._email = email;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get fullName(): string {
        return this._fullName;
    }

    public set fullName(value: string) {
        this._fullName = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public getUser() {
        return this;
    }

    public setUser(user: User) {
        this._id = user.id;
        this._username = user.username;
        this._fullName = user.fullName;
        this._email = user.email;
    }

    static getInstance() {
        if (!User._instance) {
            User._instance = new User();
        }
        return User._instance;
    }

    getDisplayName() {
        return 'User';
    }

    getDisplayInitial() {
        return 'U';
    }
}
