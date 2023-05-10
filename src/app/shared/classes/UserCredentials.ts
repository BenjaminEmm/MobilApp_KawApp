export class UserCredentials {
    public adresseMail: string;
    public password: string;

    constructor(args: any = null) {
        this.adresseMail = args?.adresseMail;
        this.password = args?.password;
    }
}

