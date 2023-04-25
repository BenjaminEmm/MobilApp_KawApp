import { UserModel } from "src/app/shared/models/user.models";

export class CurrentUser extends UserModel {
    constructor(args: any = null) {
        super(args);
    }

    /**
     * 
     * @returns Returns the current value associated with the key `token` from local storage, or null if does not exist.
     */
    public getToken(): string | null {
        return localStorage.getItem('token');
    }
}
