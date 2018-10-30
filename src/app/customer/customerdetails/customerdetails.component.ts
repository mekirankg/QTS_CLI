import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../_models/customer';
import { Common } from '../../_helpers/common';

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {
  newCustomer: Customer = new Customer();
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('customerid');
    if (id != undefined) {
      let itemRef = db.object('customer');
      itemRef.snapshotChanges().subscribe(action => {
        let obj = Common.snapshotToArray(action.payload);
        obj.forEach(element => {
          let obj: Customer = JSON.parse(element);
          if (obj.customerId != undefined && obj.customerId.endsWith(id)) {
            obj.customerId = obj.customerId.replace("/", "");
            this.newCustomer = obj;
          }
        });
        if (this.newCustomer.customerId == undefined) {
          alert("Invalid customer selected ");
          this.router.navigate(['/listcustomer']);
        }
      });
    }
    else {
      alert("Invalid Customer selected ");
      this.router.navigate(['/listcustomer']);
    }
  }

  ngOnInit() {
  }
  delete(key, cust: Customer) {

    this.db.database.ref(`customer/${key}`).once("value", snapshot => {
      let sid = snapshot.key;
      if (snapshot.exists()) {
        alert('Do you want to delete the record ?');
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
    })
  }

}
