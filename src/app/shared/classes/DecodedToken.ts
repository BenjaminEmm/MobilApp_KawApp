export class DecodedToken {
    public id: number;
    public email: string;
    public role: string;
    public exp: number;

    constructor(args: any = null) {
        this.id = args?.id;
        this.email = args?.email;
        this.role = args["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        this.exp = args?.exp;
    }
}