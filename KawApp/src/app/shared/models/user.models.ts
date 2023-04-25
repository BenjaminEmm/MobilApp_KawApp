export class UserModel {
    public id: number;
    public username: string;
    public role: string;

    constructor(args: any = null) {
        this.id = args?.id;
        this.username = args?.username;
        this.role = args?.role;
    }
}