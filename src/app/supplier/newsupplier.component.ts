import { Component, OnInit } from '@angular/core';
import { Supplier } from '../_models/supplier';
import { Common } from '../_helpers/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsupplier',
  templateUrl: './newsupplier.component.html',
  styleUrls: ['./newsupplier.component.css']
})
export class NewsupplierComponent implements OnInit {
  newSupplier: Supplier = new Supplier();
  constructor(public db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
  }
  register() {
    let uniqueId = "/S" + Common.newGuid();
    console.log("****" + uniqueId);
    this.newSupplier.sid = uniqueId;
    let newSupplierJson = JSON.stringify(this.newSupplier);
    console.log(newSupplierJson);

    try {
      this.db.database.ref('supplier').child(uniqueId).set(newSupplierJson);
      alert("Supplier added successfully!!. This message box is temporary");
      this.router.navigate(['/listsupplier']);
    }
    catch (ex) {

    }
  }
}
