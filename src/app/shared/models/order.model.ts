export class OrderModel {
    public createdAt: string | Date;
    public id: number;
    public customerId: number;

    constructor(args: any = null) {
        this.createdAt = new Date(args?.createdAt);
        this.id = parseInt(args?.id);
        this.customerId = parseInt(args?.customerId);
    }
}