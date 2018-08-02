import { Supplier } from "./supplier";
import { Quotation, QuotationList } from "./quotation";

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
    poRef:string;
    amountPaid:string="0";
}

export class ConfirmedPurchaseOrder {
    purchaseorder:PurchaseOrder= new PurchaseOrder();
    supplier: Supplier= new Supplier();
    quotationList:QuotationList= new QuotationList();
}