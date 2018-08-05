import { Component, OnInit } from '@angular/core';
import { Quotation, QuotationList } from '../../_models/quotation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';
import { PurchaseOrder, ConfirmedPurchaseOrder } from '../../_models/purchaseorder';
import { Salesman } from '../../_models/salesman';
import { Customer } from '../../_models/customer';
import { Supplier } from '../../_models/supplier';

@Component({
  selector: 'app-initialpolist',
  templateUrl: './initialpolist.component.html',
  styleUrls: ['./initialpolist.component.css']
})
export class InitialpolistComponent implements OnInit {
  purchaseorders: PurchaseOrder[] = [];
  confirmedpurchaseorders: ConfirmedPurchaseOrder[] = [];
  quotationList: Quotation[] = [];
  suppliers: Supplier[] = [];

  customerList: Customer[] = [];
  salesmanList: Salesman[] = [];
  constructor(public db: AngularFireDatabase) {

    let supplierRef = db.object('supplier');
    supplierRef.snapshotChanges().subscribe(action => {
      let supplierList = Common.snapshotToArray(action.payload);
      this.suppliers = [];
      let shouldContinue;
      supplierList.forEach(element => {
        let obj: Supplier = JSON.parse(element);
        this.suppliers.push(obj);
      });
      let quotationRef = db.object('quotations');
      quotationRef.snapshotChanges().subscribe(action => {
        let quotationsList = Common.snapshotToArray(action.payload);
        this.quotationList = [];
        quotationsList.forEach(element => {
          let obj: Quotation = JSON.parse(element);
          if (obj.status == QStatus[QStatus.PO]) {
            if (obj.qid != undefined) {
              obj.qid = obj.qid.replace("/", "");
              this.quotationList.push(obj);
            }
          }
        });

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

            let poRef = db.object('purchaseorder');
            poRef.snapshotChanges().subscribe(action => {
              var quatationsList = action.payload.val();
              let obj = Common.snapshotToArray(action.payload);
              this.purchaseorders = [];
              obj.forEach(element => {
                let confirmedPO: ConfirmedPurchaseOrder = new ConfirmedPurchaseOrder();

                let po: PurchaseOrder = JSON.parse(element);
                if (po.Status.toLocaleLowerCase() == "closed") {
                  confirmedPO.purchaseorder = po;
                  let supplier = this.suppliers.find(s => s.sid.endsWith(po.supplierId));

                  if (supplier == undefined) {
                    supplier = new Supplier();
                  }
                  let quotation = this.quotationList.find(q => q.qid == po.qid);

                  if (quotation == undefined) {
                    quotation = new Quotation();
                  }

                  let salesMan = this.salesmanList.filter(s => s.salesmanid.endsWith(quotation.salesmanId));
                  if (salesMan.length > 0) {
                    confirmedPO.quotationList.salesman = salesMan[0];
                  }

                  let custList = this.customerList.filter(item => item.customerId === quotation.customerId);
                  if (custList.length > 0) {
                    confirmedPO.quotationList.customer = custList[0];
                  }
                  confirmedPO.supplier = supplier;
                  confirmedPO.quotationList.quotation = quotation;
                  this.confirmedpurchaseorders.push(confirmedPO);
                }
              });
              console.log("confirmedpurchaseorders*****" + this.confirmedpurchaseorders.length)

            });
          });
        });
      });
    });
  }

  ngOnInit() {
  }

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