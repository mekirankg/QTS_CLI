import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';
import { PurchaseOrder, ConfirmedPurchaseOrder } from '../../_models/purchaseorder';
import { Quotation } from '../../_models/quotation';
import { QStatus } from '../../_helpers/Enums';
import { Supplier } from '../../_models/supplier';

@Component({
  selector: 'app-purchaseorderlist',
  templateUrl: './purchaseorderlist.component.html',
  styleUrls: ['./purchaseorderlist.component.css']
})
export class PurchaseorderlistComponent implements OnInit {
  purchaseorders: PurchaseOrder[] = [];
  confirmedpurchaseorders: ConfirmedPurchaseOrder[] = [];
  quotationList: Quotation[] = [];
  suppliers: Supplier[] = [];
  constructor(public db: AngularFireDatabase) {

    let supplierRef = db.object('supplier');
    supplierRef.snapshotChanges().subscribe(action => {
      let supplierList = Common.snapshotToArray(action.payload);
      this.suppliers = [];
      let shouldContinue;
      supplierList.forEach(element => {
        let obj: Supplier = JSON.parse(element);
        console.log("supplier********"+obj.sid);
        console.log("supplier********");
        this.suppliers.push(obj);
      });
      console.log("suppliers*****" + this.suppliers.length);
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
        console.log("quotationList*****" + this.quotationList.length);
        let poRef = db.object('purchaseorder');
        poRef.snapshotChanges().subscribe(action => {
          var quatationsList = action.payload.val();
          let obj = Common.snapshotToArray(action.payload);
          this.purchaseorders = [];
          obj.forEach(element => {
            let confirmedPO: ConfirmedPurchaseOrder = new ConfirmedPurchaseOrder();
            console.log("PO********"+element);
            let po: PurchaseOrder = JSON.parse(element);
            confirmedPO.purchaseorder = po;
            let supplier = this.suppliers.find(s => s.sid.endsWith( po.supplierId);
            console.log("supplier********"+supplier.supplierName);
            if (supplier == undefined) {
              supplier = new Supplier();
            }
            let quotation = this.quotationList.find(q => q.qid == po.qid);
            
            if (quotation == undefined) {
              quotation = new Quotation();
            }
            confirmedPO.supplier = supplier;
            confirmedPO.quotation = quotation;
            this.confirmedpurchaseorders.push(confirmedPO);
          });
          console.log("confirmedpurchaseorders*****" + this.confirmedpurchaseorders.length)

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
        "Status": "Completed",
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
        "Status": "On Going",
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
  */
}
