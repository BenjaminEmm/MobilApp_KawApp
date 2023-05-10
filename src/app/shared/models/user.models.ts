export class UserModel {
    public id: number;
    public adresseMail: string;
    public role: string;

    constructor(args: any = null) {
        this.id = args?.id;
        this.adresseMail = args?.adresseMail;
        this.role = args?.role;
    }
}