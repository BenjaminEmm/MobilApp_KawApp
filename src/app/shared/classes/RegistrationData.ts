export class RegistrationData {
    public username: string;
    public firstName: string;
    public lastName: string;
    public city: string;
    public zipcode: string;
    public company: string;

    constructor(args: any = null) {
        this.username = args?.username;
        this.firstName = args?.firstName;
        this.lastName = args?.lastName;
        this.city = args?.city;
        this.zipcode = args?.zipcode;
        this.company = args?.company;
    }

}
