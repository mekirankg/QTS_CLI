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
  public qid: string;
  newQuotation: Quotation = new Quotation();
  newPO: PurchaseOrder = new PurchaseOrder();
  suppliers: Supplier[] = [];
  selectedsupplier:string="";
  ngOnInit(): void {

  }
  constructor(private route: ActivatedRoute,private router: Router, public db: AngularFireDatabase) {
    this.qid = this.route.snapshot.paramMap.get('id');

    let supplierRef = db.object('supplier');
    supplierRef.snapshotChanges().subscribe(action => {
      var supplierList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      obj.forEach(element => {
        let obj: Supplier = JSON.parse(element);
        console.log("****" + element);
        if(obj.sid != undefined)
        {
          obj.sid = obj.sid.replace("/","");
        }
        this.suppliers.push(obj);
      });
    });



    let itemRef = db.object('quotations');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      obj.forEach(element => {
        let obj: Quotation = JSON.parse(element);
        if (obj.qid != undefined && obj.qid.endsWith(this.qid)) {
          obj.qid = obj.qid.replace("/", "");
          this.newQuotation = obj;
          this.newPO.qid = obj.qid;
          return;
        }
      });
    });
   
  }

  createPO() {
    alert(this.selectedsupplier);
    let uniquePOId = "P" + Common.newGuid();
    console.log("****" + uniquePOId);
    this.newPO.pid = uniquePOId;
    this.newPO.qid=this.qid;
    this.newPO.supplierId=this.selectedsupplier;
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





  }
}
