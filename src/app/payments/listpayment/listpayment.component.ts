import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listpayment',
  templateUrl: './listpayment.component.html',
  styleUrls: ['./listpayment.component.css']
})
export class ListpaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  payments: any[] = [
    {
      "Id": "UniquePayment_Id_1",
      "QuotationId": "Quotation_ID1",
      "QuotationReference": "123456789",
      //"quotationName":"qname2",
      "SalesValue": "100000",
      "Paymenttype": "Advance Payment",
      "PaymentAmount": "25000",
      "remarks": "This is a remark about this Payment"
    },{
      "Id": "UniquePayment_Id_2",
      "QuotationId": "Quotation_ID2",
      "QuotationReference": "123456789",
      //"quotationName":"qname2",
      "SalesValue": "25000",
      "Paymenttype": "Balance Payment",
      "PaymentAmount": "15000",
      "remarks": "This is a remark about this Payment"
    },
    {
      "Id": "UniquePayment_Id_3",
      "QuotationId": "Quotation_ID3",
      "QuotationReference": "123456789",
      //"quotationName":"qname2",
      "SalesValue": "65000",
      "Paymenttype": "Advance Payment",
      "PaymentAmount": "40000",
      "remarks": "This is a remark about this Payment"
    },
    {
      "Id": "UniquePayment_Id_4",
      "QuotationId": "Quotation_ID4",
      "QuotationReference": "123456789",
      //"quotationName":"qname2",
      "SalesValue": "42000",
      "Paymenttype": "Advance Payment",
      "PaymentAmount": "35000",
      "remarks": "This is a remark about this Payment"
    },
    {
      "Id": "UniquePayment_Id_5",
      "QuotationId": "Quotation_ID5",
      "QuotationReference": "123456789",
      //"quotationName":"qname2",
      "SalesValue": "15000",
      "Paymenttype": "Balance Payment",
      "PaymentAmount": "8000",
      "remarks": "This is a remark about this Payment"
    }

  ];
}
