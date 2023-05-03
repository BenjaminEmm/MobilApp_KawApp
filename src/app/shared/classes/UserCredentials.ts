export class UserCredentials {
    public email: string;
    public password: string;

    constructor(args: any = null) {
        this.email = args?.email;
        this.password = args?.password;
    }
}

