import { Component, OnInit } from '@angular/core';
import { Quotation } from '../../_models/quotation';
import { PurchaseOrder, ConfirmedPurchaseOrder } from '../../_models/purchaseorder';
import { Supplier } from '../../_models/supplier';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';
import { Customer } from '../../_models/customer';
import { Salesman } from '../../_models/salesman';

@Component({
  selector: 'app-purchaseorderdetails',
  templateUrl: './purchaseorderdetails.component.html',
  styleUrls: ['./purchaseorderdetails.component.css']
})
export class PurchaseorderdetailsComponent implements OnInit {
  //  isEditable: Boolean = true;
  isLoaded: Boolean = false;
  isEditable: Boolean = false;
  confirmedPO: ConfirmedPurchaseOrder = new ConfirmedPurchaseOrder();
  pid: string = "";

  customerList: Customer[] = [];
  salesmanList: Salesman[] = [];
  selectedCustomer: Customer = new Customer();
  selectedSalesMan: Salesman = new Salesman();
  constructor(private route: ActivatedRoute, private router: Router, public db: AngularFireDatabase) {
    this.pid = this.route.snapshot.paramMap.get('id');


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


        let poitemRef = db.object('purchaseorder');
        poitemRef.snapshotChanges().subscribe(action => {
          let poList = Common.snapshotToArray(action.payload);
          poList.forEach(element => {
            let poobj: PurchaseOrder = JSON.parse(element);
            if (poobj.pid != undefined && poobj.pid.endsWith(this.pid)) {
              poobj.qid = poobj.qid.replace("/", "");
              this.confirmedPO.purchaseorder = poobj;
              // get the quotation for the PO
              let qitemRef = db.object('quotations');
              qitemRef.snapshotChanges().subscribe(action => {
                let qobj = Common.snapshotToArray(action.payload);
                qobj.forEach(element => {
                  let obj: Quotation = JSON.parse(element);
                  if (obj.qid != undefined && obj.qid.endsWith(this.confirmedPO.purchaseorder.qid)) {
                    obj.qid = obj.qid.replace("/", "");
                    this.confirmedPO.quotationList.quotation = obj;

                    let salesMan = this.salesmanList.filter(s => s.salesmanid.endsWith(obj.salesmanId));
                    if (salesMan.length > 0) {
                      this.confirmedPO.quotationList.salesman = salesMan[0];
                    }

                    let custList = this.customerList.filter(item => item.customerId === obj.customerId);
                    if (custList.length > 0) {
                      this.confirmedPO.quotationList.customer = custList[0];
                    }
                    //  alert("q"+element);

                    // get the supplier details
                    let supplierRef = db.object('supplier');
                    supplierRef.snapshotChanges().subscribe(action => {
                      var supplierList = action.payload.val();
                      let obj = Common.snapshotToArray(action.payload);
                      obj.forEach(element => {
                        let obj: Supplier = JSON.parse(element);
                        console.log("****" + element);
                        if (obj.sid != undefined && obj.sid.endsWith(this.confirmedPO.purchaseorder.supplierId)) {
                          obj.sid = obj.sid.replace("/", "");
                          this.confirmedPO.supplier = obj;
                          let status= this.confirmedPO.purchaseorder.Status.toLocaleLowerCase();
                          if(status =="on going"){
                            this.isEditable=true;
                          }
                          this.isLoaded = true;
                        }
                      });
                    });
                    return;
                  }
                });
              });
              return;
            }
          });
        });
      });
    });
  }

  ngOnInit() {
  }

}
