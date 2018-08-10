import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Supplier } from '../_models/supplier';
import { Common } from '../_helpers/common';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-listsupplier',
  templateUrl: './listsupplier.component.html',
  styleUrls: ['./listsupplier.component.css']
})
export class ListsupplierComponent implements OnInit {

  newSupplier: Supplier = new Supplier();
  suppliers: Supplier[] = [];
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    let itemRef = db.object('supplier');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.suppliers = [];
      obj.forEach(element => {
        let obj: Supplier = JSON.parse(element);
        if (obj.sid != undefined) {
          obj.sid = obj.sid.replace("/", "");
          this.newSupplier = obj;
        }

        console.log("supplier added")
        this.suppliers.push(obj as Supplier);

      });
    });
  }

  ngOnInit() {
  }

  delete(key, sup: Supplier) {
    this.db.database.ref(`supplier/${key}`).once("value", snapshot => {
      let sid = snapshot.key;
      if (snapshot.exists()) {
        sup.isDeleted = true;
        var updates = {};
        updates['/supplier/' + sid] = JSON.stringify(sup);
        try {
          let up = this.db.database.ref().update(updates);
          this.router.navigate(['/listsupplier']);
        }
        catch (ex) {
          alert("Error in Deleting supplier");
        }




      }
    })





    this.router.navigate(['/listsupplier']);


    //   }
    // });

    // console.log("key........", key)




  }
}
