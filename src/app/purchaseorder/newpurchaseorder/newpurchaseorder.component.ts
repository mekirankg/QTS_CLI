import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '../../_helpers/common';
import { Quotation } from '../../_models/quotation';
import { AngularFireDatabase } from 'angularfire2/database';
import { PurchaseOrder } from '../../_models/purchaseorder';
import { Supplier } from '../../_models/supplier';

@Component({
  selector: 'app-newpurchaseorder',
  templateUrl: './newpurchaseorder.component.html',
  styleUrls: ['./newpurchaseorder.component.css']
})

export class NewpurchaseorderComponent implements OnInit {
  public id: string;
  newQuotation: Quotation = new Quotation();
  newPO: PurchaseOrder = new PurchaseOrder();
  suppliers: Supplier[] = [];
  selectedsupplier: string = "";
  isEditMode: Boolean = false;
  isLoaded: Boolean = false;
  ngOnInit(): void {

  }
  constructor(private route: ActivatedRoute, private router: Router, public db: AngularFireDatabase) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.toLowerCase().startsWith('p')) {
      this.isEditMode = true;
    }
    let supplierRef = db.object('supplier');
    supplierRef.snapshotChanges().subscribe(action => {
      var supplierList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      obj.forEach(element => {
        let obj: Supplier = JSON.parse(element);
        console.log("****" + element);
        if (obj.sid != undefined) {
          obj.sid = obj.sid.replace("/", "");
        }
        this.suppliers.push(obj);
      });

      if (this.id.toLowerCase().startsWith('p')) {
        this.isEditMode = true;
        let poitemRef = db.object('purchaseorder');
        poitemRef.snapshotChanges().subscribe(action => {
          let poList = Common.snapshotToArray(action.payload);
          poList.forEach(element => {
            let poobj: PurchaseOrder = JSON.parse(element);
            if (poobj.pid != undefined && poobj.pid.endsWith(this.id)) {
              poobj.qid = poobj.qid.replace("/", "");
              this.newPO = poobj;
              // get the quotation for the PO
              let qitemRef = db.object('quotations');
              qitemRef.snapshotChanges().subscribe(action => {
                let qobj = Common.snapshotToArray(action.payload);
                qobj.forEach(element => {
                  let obj: Quotation = JSON.parse(element);
                  if (obj.qid != undefined && obj.qid.endsWith(this.newPO.qid)) {
                    obj.qid = obj.qid.replace("/", "");
                    this.newQuotation = obj;
                    this.suppliers.forEach(element => {
                      if(element.sid.endsWith(this.newPO.supplierId))
                      this.selectedsupplier=element.sid;
                      this.isLoaded=true;
                    });
                  }
                });
              });
              return;
            }
          });
        });
      }

    });
    if (!this.id.toLowerCase().startsWith('p')) {
      {
        this.isEditMode = false;
        let itemRef = db.object('quotations');
        itemRef.snapshotChanges().subscribe(action => {
          var quatationsList = action.payload.val();
          let obj = Common.snapshotToArray(action.payload);
          obj.forEach(element => {
            let obj: Quotation = JSON.parse(element);
            if (obj.qid != undefined && obj.qid.endsWith(this.id)) {
              obj.qid = obj.qid.replace("/", "");
              this.newQuotation = obj;
              this.newPO.qid = obj.qid;
              this.isLoaded=true;
              return;
            }
          });
        });

      }
    }
  }

    createPO() {
      if (!this.isEditMode) {
        let uniquePOId = "P" + Common.newGuid();
        console.log("****qid" + this.id);
        this.newPO.pid = uniquePOId;
        this.newPO.qid = this.id;
        this.newPO.supplierId = this.selectedsupplier;
        let newPOJson = JSON.stringify(this.newPO);
        console.log(newPOJson);
        try {
          this.db.database.ref('purchaseorder').child(uniquePOId).set(newPOJson);
          alert("PO added successful!!. This message box temporary");
          this.router.navigate(['/listpo']);
        }
        catch (ex) {
          alert("Error in adding PO");
        }

      } else {
        var updates = {};
        this.newPO.supplierId=this.selectedsupplier;
        updates['/purchaseorder/' + this.newPO.pid] = JSON.stringify(this.newPO);
        try {
          let up = this.db.database.ref().update(updates);
          alert("PO updated successfully")
          this.router.navigate(['/listpo']);
        }
        catch (ex) {
          alert("Error in Updating Quotation");
        }

      }
    }
  }
