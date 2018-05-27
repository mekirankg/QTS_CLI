import { Component, OnInit } from '@angular/core';
import { Quotation } from '../../_models/quotation';
import { PurchaseOrder, ConfirmedPurchaseOrder } from '../../_models/purchaseorder';
import { Supplier } from '../../_models/supplier';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';

@Component({
  selector: 'app-purchaseorderdetails',
  templateUrl: './purchaseorderdetails.component.html',
  styleUrls: ['./purchaseorderdetails.component.css']
})
export class PurchaseorderdetailsComponent implements OnInit {
//  isEditable: Boolean = true;
  isLoaded:Boolean=false;
  confirmedPO: ConfirmedPurchaseOrder = new ConfirmedPurchaseOrder();
  pid: string = "";
  constructor(private route: ActivatedRoute, private router: Router, public db: AngularFireDatabase) {
    this.pid = this.route.snapshot.paramMap.get('id');

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
             // alert(obj.qid +"**"+this.confirmedPO.purchaseorder.qid);
              if (obj.qid != undefined && obj.qid.endsWith(this.confirmedPO.purchaseorder.qid)) {
                obj.qid = obj.qid.replace("/", "");
                this.confirmedPO.quotation = obj;
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
                      this.isLoaded=true;
                    //  alert("s"+element);
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
  }

  ngOnInit() {
  }

}
