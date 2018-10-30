import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';
import { Salesman } from '../../_models/salesman';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-listsalesman',
  templateUrl: './listsalesman.component.html',
  styleUrls: ['./listsalesman.component.css']
})
export class ListsalesmanComponent implements OnInit {
  salesmanList: Salesman[] = [];
  constructor(public db: AngularFireDatabase, private router: Router) {
    let itemRef = db.object('salesman');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.salesmanList = [];
      obj.forEach(element => {
        let obj: Salesman = JSON.parse(element);
        if (obj.salesmanid != undefined) {
          obj.salesmanid = obj.salesmanid.replace("/", "");

        }
        console.log("supplier added")

        this.salesmanList.push(obj);
      });
    });
  }

  ngOnInit() {
  }
  delete(key, sale: Salesman) {
    this.db.database.ref(`salesman/${key}`).once("value", snapshot => {
      let sid = snapshot.key;
      if (snapshot.exists()) {
        if (confirm('Are you sure to delete ' +sale.salesmanName)) {

          sale.isDeleted = true;
          var updates = {};
          updates['/salesman/' + sid] = JSON.stringify(sale);
          try {
            let up = this.db.database.ref().update(updates);
            this.router.navigate(['/listsalesman']);
          }
          catch (ex) {
            alert("Error in Deleting salesman");
          }
        }
      }
    })

  }

}
