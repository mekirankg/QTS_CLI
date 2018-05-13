import { Component, OnInit } from '@angular/core';
import { Quotation } from '../../_models/quotation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';
import { PurchaseOrder } from '../../_models/purchaseorder';

@Component({
  selector: 'app-initialpolist',
  templateUrl: './initialpolist.component.html',
  styleUrls: ['./initialpolist.component.css']
})
export class InitialpolistComponent implements OnInit {
  quotationsList: Quotation[] = [];
  purchaseorders: Quotation[] = [];
  confirmedpurchaseorders: PurchaseOrder[] = [];
  constructor(public db: AngularFireDatabase) {
    let shouldContinue = false;
    let poRef = db.object('purchaseorder');
    poRef.snapshotChanges().subscribe(action => {
      let poList = Common.snapshotToArray(action.payload);
      this.confirmedpurchaseorders = [];
      poList.forEach(element => {
        let po_obj: PurchaseOrder = JSON.parse(element);
        this.confirmedpurchaseorders.push(po_obj);
      });
      shouldContinue = true;
    });

    let itemRef = db.object('quotations');
    itemRef.snapshotChanges().subscribe(action => {
      while (!shouldContinue) {

      }
      let quotationsList = Common.snapshotToArray(action.payload);
      this.purchaseorders = [];
      quotationsList.forEach(element => {
        let obj: Quotation = JSON.parse(element);
        if (obj.status == QStatus[QStatus.PO]) {
          if (obj.qid != undefined) {
            obj.qid = obj.qid.replace("/", "");
            console.log("length" + this.confirmedpurchaseorders.length);
            let poIndex = this.confirmedpurchaseorders.findIndex(p => p.qid == obj.qid);
            if (poIndex == -1) {
              this.purchaseorders.push(obj);
            }
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