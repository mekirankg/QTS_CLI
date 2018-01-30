import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initialpolist',
  templateUrl: './initialpolist.component.html',
  styleUrls: ['./initialpolist.component.css']
})
export class InitialpolistComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  purchaseorders: any[] = [
    {
      "Id": "Unique_Id_1",
      "customerName": "Name1",
      "customerContact": "123456789",
      //"quotationName":"qname2",
      "salesmanName": "salesman1",
      "totalvalue": "12345",
      "status": "PO",
      "nextFollowupdate": "01-02-18",
      "remarks": "This is a remark about this quotation"
    },
    {
      "Id": "Unique_Id_2",
      "customerName": "Name2",
      "customerContact": "123456789",
      //   "quotationName":"qname1",
      "salesmanName": "salesman1",
      "totalvalue": "12345",
      "status": "PO",
      "nextFollowupdate": "01-02-18"
    },
    {
      "Id": "Unique_Id_3",
      "customerName": "Name3",
      "customerContact": "123456789",
      //    "quotationName":"qname1",
      "salesmanName": "salesman1",
      "totalvalue": "12345",
      "status": "PO",
      "nextFollowupdate": "01-02-18",
      "remarks": "This is a remark about this quotation"
    },
    {
      "Id": "Unique_Id_4",
      "customerName": "Name4",
      "customerContact": "123456789",
      //   "quotationName":"qname1",
      "salesmanName": "salesman1",
      "totalvalue": "12345",
      "status": "PO",
      "nextFollowupdate": "01-02-18"
    }

  ];

}
