import { Component, OnInit } from '@angular/core';
import { Supplier } from '../_models/supplier';
import { Common } from '../_helpers/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsupplier',
  templateUrl: './newsupplier.component.html',
  styleUrls: ['./newsupplier.component.css']
})
export class NewsupplierComponent implements OnInit {
  newSupplier: Supplier = new Supplier();
  sIdEditMode: string = "";
  isEditMode: Boolean = false;
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    this.createSupplierForm();
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
        if (this.newSupplier.sid == undefined) {
          alert("Invalid quotation selected for edit...");
          this.router.navigate(['/listquotation']);
        }
      });
    }
  }

  ngOnInit() {
  }
  cancel() {
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
      this.newSupplier.isDeleted =false;
      let newSupplierJson = JSON.stringify(this.newSupplier);
      console.log(newSupplierJson);
      try {
        this.db.database.ref('supplier').child(uniqueId ).set(newSupplierJson);
        alert("Supplier added successfully!!.");
        this.router.navigate(['/listsupplier']);
      }
      catch (ex) {

      }
    }
  }

  //validation
  supplierForm = new FormGroup(
    {
      supplierName: new FormControl(),
      supplierConatactName: new FormControl(),
      supplierContactNumber: new FormControl(),
      supplierReference: new FormControl(),
      freightForwarder: new FormControl(),
      remarks: new FormControl()
    }
  );
  createSupplierForm() {
    this.supplierForm = this.fb.group(
      {
        supplierName: [null, Validators.required],
        supplierConatactName: [null, Validators.required],
        supplierContactNumber: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')])],
        supplierReference: [null, Validators.required],
        freightForwarder: [null, Validators.required],
        remarks: ['',Validators.maxLength(200)]
      }
    );
  }

}
