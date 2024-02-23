export default class User {
    static _instance: User;

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