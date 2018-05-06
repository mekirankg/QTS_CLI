import { Component, OnInit } from '@angular/core';
import { Quotation } from '../../_models/quotation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';

@Component({
  selector: 'app-initialpolist',
  templateUrl: './initialpolist.component.html',
  styleUrls: ['./initialpolist.component.css']
})
export class InitialpolistComponent implements OnInit {  
  purchaseorders: Quotation[] = [];
  constructor(public db: AngularFireDatabase) {
    let itemRef = db.object('quotations');

    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.purchaseorders = [];
      obj.forEach(element => {
        let obj: Quotation = JSON.parse(element);
        if(obj.status == QStatus[QStatus.PO])
        {
          if(obj.qid != undefined)
          {
            obj.qid = obj.qid.replace("/","");
            this.purchaseorders.push(obj);
          }          
        }       
      });
    });
   }

  ngOnInit() {
  }
/*
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
*/

}

enum QStatus {
  DropBox,
  Bidding,
  OnGoing,
  TechnicalReview,
  PO,
  Cancelled,
  Lost
}