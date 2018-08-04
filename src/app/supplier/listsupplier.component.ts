import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Supplier } from '../_models/supplier';
import { Common } from '../_helpers/common';

@Component({
  selector: 'app-listsupplier',
  templateUrl: './listsupplier.component.html',
  styleUrls: ['./listsupplier.component.css']
})
export class ListsupplierComponent implements OnInit {
  suppliers: Supplier[] = [];
  constructor(public db: AngularFireDatabase) {
    let itemRef = db.object('supplier');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.suppliers = [];
      obj.forEach(element => {
        let obj: Supplier = JSON.parse(element);
        if (obj.sid != undefined) {
          obj.sid = obj.sid.replace("/", "");
        }
        console.log("supplier added")
        this.suppliers.push(obj);
      });
    });
  }

  ngOnInit() {
  }
}
