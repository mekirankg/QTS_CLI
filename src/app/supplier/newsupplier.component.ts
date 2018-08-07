import { Component, OnInit } from '@angular/core';
import { Supplier } from '../_models/supplier';
import { Common } from '../_helpers/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newsupplier',
  templateUrl: './newsupplier.component.html',
  styleUrls: ['./newsupplier.component.css']
})
export class NewsupplierComponent implements OnInit {
  newSupplier: Supplier = new Supplier();
  sIdEditMode:string="";
  isEditMode:Boolean=false;
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('sid');

    if (id != undefined) {
      this.sIdEditMode = id;
      this.isEditMode = true;
      let itemRef = db.object('supplier');
      itemRef.snapshotChanges().subscribe(action => {
        var quatationsList = action.payload.val();
        let obj = Common.snapshotToArray(action.payload);
        obj.forEach(element => {
          let obj: Supplier = JSON.parse(element);
          if (obj.sid != undefined && obj.sid.endsWith(id)) {
            obj.sid = obj.sid.replace("/", "");
            this.newSupplier = obj;
          }
        });
        if(this.newSupplier.sid==undefined)
        {         
          alert("Invalid quotation selected for edit...");
          this.router.navigate(['/listquotation']);
        }
      });
    }
  }

  ngOnInit() {
  }
  cancel(){
    this.router.navigate(['/listsupplier'])
  }
  register() {

    if (this.isEditMode) {
      var updates = {};
      updates['/supplier/' + this.newSupplier.sid] = JSON.stringify(this.newSupplier);
      try {
        let up = this.db.database.ref().update(updates);
        this.router.navigate(['/listsupplier']);
      }
      catch (ex) {
        alert("Error in Updating Quotation");
      }
    }
    else {
    let uniqueId = "/S" + Common.newGuid();
    this.newSupplier.sid = uniqueId;
    let newSupplierJson = JSON.stringify(this.newSupplier);
    console.log(newSupplierJson);
    try {
      this.db.database.ref('supplier').child(uniqueId).set(newSupplierJson);
      alert("Supplier added successfully!!.");
      this.router.navigate(['/listsupplier']);
    }
    catch (ex) {

    }}
  }
}
