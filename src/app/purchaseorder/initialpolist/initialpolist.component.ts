import { Component, OnInit } from '@angular/core';
import { Quotation, QuotationList } from '../../_models/quotation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';
import { PurchaseOrder } from '../../_models/purchaseorder';
import { Salesman } from '../../_models/salesman';
import { Customer } from '../../_models/customer';

@Component({
  selector: 'app-initialpolist',
  templateUrl: './initialpolist.component.html',
  styleUrls: ['./initialpolist.component.css']
})
export class InitialpolistComponent implements OnInit {
  quotationsList: Quotation[] = [];
  purchaseorders: QuotationList[] = [];
  confirmedpurchaseorders: PurchaseOrder[] = [];
  customerList: Customer[] = [];
  salesmanList: Salesman[] = [];
  constructor(public db: AngularFireDatabase) {
    let poRef = db.object('purchaseorder');
    poRef.snapshotChanges().subscribe(action => {
      let poList = Common.snapshotToArray(action.payload);
      this.confirmedpurchaseorders = [];
      poList.forEach(element => {
        let po_obj: PurchaseOrder = JSON.parse(element);
        this.confirmedpurchaseorders.push(po_obj);
      });

      let itemRef = db.object('quotations');
      let salesmanitemRef = db.object('salesman');
      salesmanitemRef.snapshotChanges().subscribe(action => {
        let salesmanobj = Common.snapshotToArray(action.payload);
        salesmanobj.forEach(element => {
          let obj: Salesman = JSON.parse(element);
          this.salesmanList.push(obj);
        });
        let customeritemRef = db.object('customer');
        customeritemRef.snapshotChanges().subscribe(action => {
          let obj = Common.snapshotToArray(action.payload);
          obj.forEach(element => {
            let obj: Customer = JSON.parse(element);
            obj.customerId = obj.customerId.replace("/", "");
            this.customerList.push(obj);
  
          });
      itemRef.snapshotChanges().subscribe(action => {
        let quotationsList = Common.snapshotToArray(action.payload);
        this.purchaseorders = [];
        quotationsList.forEach(element => {
          let obj: Quotation = JSON.parse(element);
          let initialPO: QuotationList = new QuotationList();
          if (obj.status == QStatus[QStatus.PO]) {
            if (obj.qid != undefined) {
              obj.qid = obj.qid.replace("/", "");
              console.log("length" + this.confirmedpurchaseorders.length);
              let poIndex = this.confirmedpurchaseorders.findIndex(p => p.qid == obj.qid);
              if (poIndex == -1) {
                initialPO.quotation = obj;
                let salesMan = this.salesmanList.filter(s => s.salesmanid.endsWith(obj.salesmanId));
                if (salesMan.length > 0) {
                  initialPO.salesman = salesMan[0];
                }

                let custList = this.customerList.filter(item => item.customerId === obj.customerId);
                if (custList.length > 0) {
                  initialPO.customer = custList[0];
                }

                this.purchaseorders.push(initialPO);
              }
            }
          }
        });

       if( this.purchaseorders.length<=0)
       {
         alert("No Quotations are in PO status");
       }















    });
    



        
        });
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