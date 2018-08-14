import { Component, OnInit } from '@angular/core';
import { Customer } from '../../_models/customer';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-listcustomer',
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.css']
})
export class ListcustomerComponent implements OnInit {
  customerList: Customer[] = [];
  constructor(public db: AngularFireDatabase, private router: Router) {
    let itemRef = db.object('customer');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.customerList = [];
      obj.forEach(element => {
        let obj: Customer = JSON.parse(element);
        if (obj.customerId != undefined) {
          obj.customerId = obj.customerId.replace("/", "");
        }
        this.customerList.push(obj);
      });
    });
  }

  ngOnInit() {
  }
  delete(key, cust: Customer) {

    this.db.database.ref(`customer/${key}`).once("value", snapshot => {
      let sid = snapshot.key;
      if (snapshot.exists()) {
        if (confirm('Are you sure to delete' + cust.customerName)) {

          cust.isDeleted = true;
          var updates = {};
          updates['/customer/' + sid] = JSON.stringify(cust);
          try {
            let up = this.db.database.ref().update(updates);
            this.router.navigate(['/listcustomer']);
          }
          catch (ex) {
            alert("Error in Deleting customer");
          }
        }
      }
    })
  }

}