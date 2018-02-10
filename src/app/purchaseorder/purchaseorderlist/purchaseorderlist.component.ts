import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchaseorderlist',
  templateUrl: './purchaseorderlist.component.html',
  styleUrls: ['./purchaseorderlist.component.css']
})
export class PurchaseorderlistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  purchaseorders: any[] = [
    {
      "Id": "Unique_Id_1",
      "Supplier": "Supplier1",
      "SupplierRefNo": "SupplierRefNo1",
      "Description": "This is some description about the PO",
      "SalesPerson": "SalesPerson1",
      "Currency": "INR",
      "Amount": "10000",
      "SalesValue": "10000rs",
      "Milestone": "Milestone 1",
      "MilestoneCompDate": "02/02/2018",
      "Status": "On Going",
      "Expiry": "20/03/2018",
      "Remark": "Remarks about this PO",
      "AmountPaid":"8000"
    },
    {
      "Id": "Unique_Id_2",
      "Supplier": "Supplier2",
      "SupplierRefNo": "SupplierRefNo2",
      "Description": "This is some description about the PO",
      "SalesPerson": "SalesPerson2",
      "Currency": "$",
      "Amount": "3000",
      "SalesValue": "5000$",
      "Milestone": "Milestone 2",
      "MilestoneCompDate": "08/02/2018",
      "Status": "On Going",
      "Expiry": "30/04/2018",
      "Remark": "Remarks about this PO",
      "AmountPaid":"3000"
    },
    {
      "Id": "Unique_Id_3",
      "Supplier": "Supplier3",
      "SupplierRefNo": "SupplierRefNo3",
      "Description": "This is some description about the PO",
      "SalesPerson": "SalesPerson3",
      "Currency": "INR",
      "Amount": "30000",
      "SalesValue": "34000rs",
      "Milestone": "Milestone 3",
      "MilestoneCompDate": "02/05/2018",
      "Status": "Completed",
      "Expiry": "20/08/2018",
      "Remark": "Remarks about this PO",
      "AmountPaid":"34000"
    },
    {
      "Id": "Unique_Id_4",
      "Supplier": "Supplier4",
      "SupplierRefNo": "SupplierRefNo4",
      "Description": "This is some description about the PO",
      "SalesPerson": "SalesPerson1",
      "Currency": "KD",
      "Amount": "8000",
      "SalesValue": "10000",
      "Milestone": "Milestone 4",
      "MilestoneCompDate": "06/03/2018",
      "Status": "Completed",
      "Expiry": "20/03/2018",
      "Remark": "Remarks about this PO",
      "AmountPaid":"8000"
    },


  ];

}
