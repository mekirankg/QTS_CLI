import { Component, OnInit } from '@angular/core';
import { Common } from '../../_helpers/common';
import { Customer } from '../../_models/customer';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.css']
})
export class NewcustomerComponent implements OnInit {
  newCustomer: Customer = new Customer();
  sIdEditMode: string = "";
  isEditMode: Boolean = false;
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('customerid');
    if (id != undefined) {
      this.sIdEditMode = id;
      this.isEditMode = true;
      let itemRef = db.object('customer');
      itemRef.snapshotChanges().subscribe(action => {
        var quatationsList = action.payload.val();
        let obj = Common.snapshotToArray(action.payload);
        obj.forEach(element => {
          let obj: Customer = JSON.parse(element);
          if (obj.customerId != undefined && obj.customerId.endsWith(id)) {
            obj.customerId = obj.customerId.replace("/", "");
            this.newCustomer = obj;
          }
        });
        if (this.newCustomer.customerId == undefined) {
          alert("Invalid Customer selected for edit...");
          this.router.navigate(['/listcustomer']);
        }
      });
    }
  }

  ngOnInit() {
  }
  cancel(){
    this.router.navigate(['/listcustomer']);
  }
  create() {

    if (this.isEditMode) {
      var updates = {};
      updates['/customer/' + this.newCustomer.customerId] = JSON.stringify(this.newCustomer);
      try {
        let up = this.db.database.ref().update(updates);
        alert("customer updated successfully!!.");
        this.router.navigate(['/listcustomer']);
      }
      catch (ex) {
        alert("Error in Updating customer");
      }
    }
    else {
      let uniqueId = "/C" + Common.newGuid();
      this.newCustomer.customerId = uniqueId;
      let newCustomerJson = JSON.stringify(this.newCustomer);
      console.log(newCustomerJson);
      try {
        this.db.database.ref('customer').child(uniqueId).set(newCustomerJson);
        alert("Customer added successfully!!.");
        this.router.navigate(['/listcustomer']);
      }
      catch (ex) {

      }
    }
  }
}
