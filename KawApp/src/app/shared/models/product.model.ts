export class ProductModel {
    public createdAt: Date;
    public name: string;
    public details: { price: string, description: string, color: string };
    public stock: number;
    public id: number;
    public orderId: number;

    constructor(args: any = null) {
        this.createdAt = new Date(args?.createdAt);
        this.name = args?.name;
        this.details = args?.details;
        this.stock = parseInt(args?.stock);
        this.id = parseInt(args?.id);
        this.orderId = parseInt(args?.orderId);
    }
}