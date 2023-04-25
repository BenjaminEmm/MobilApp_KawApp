import { OrderModel } from "./order.model";

export class CustomerModel {
    public createdAt: string | Date;
    public name: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public address: { postalCode: string, city: string };
    public profile: { firstName: string, lastName: string };
    public company: { companyName: string };
    public id: number;
    public orders: OrderModel[];

    constructor(args: any = null) {
        this.createdAt = new Date(args?.createdAt);
        this.name = args?.name;
        this.username = args?.username;
        this.firstName = args?.firstName;
        this.lastName = args?.lastName;
        this.address = args?.address;
        this.profile = args?.profile;
        this.company = args?.company;
        this.id = parseInt(args?.id);
        this.orders = args?.orders.map((order: any) => new OrderModel(order));
    }
}

