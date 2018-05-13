import { Supplier } from "./supplier";
import { Quotation } from "./quotation";

export class PurchaseOrder {
    pid: string;
    qid:string;
    supplierId: string;
    currency: string;
    description: string;
    salesValue:string;
    amount:string;
    milestone:string;
    milestoneCompletionDate:string;
    expiryDate:string;
    Status:string;
    remarks:string;
    amountPaid:string="0";
}

export class ConfirmedPurchaseOrder {
    purchaseorder:PurchaseOrder= new PurchaseOrder();
    supplier: Supplier= new Supplier();
    quotation:Quotation= new Quotation();
}