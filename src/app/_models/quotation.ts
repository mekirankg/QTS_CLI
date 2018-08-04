import { Salesman } from "./salesman";
import { Customer } from "./customer";

export class Quotation {
    qid: string;
    salesmanId:string;
    customerId:string;
 //   customerName: string;
 //   customerContact: string;
    salesmanName: string;
    totalvalue: number;
    status: string;
    nextFollowupdate: string;
    remarks: string;
    quotationReference: string;
    materialDescription: string;
    valueSplit: string;
    totalValueSplit: string;
}

export class QuotationList{
    quotation:Quotation=new Quotation();
    salesman:Salesman=new Salesman();
    customer:Customer=new Customer();
}
