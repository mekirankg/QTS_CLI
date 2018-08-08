import { Component, OnInit } from '@angular/core';
import { Common } from '../../_helpers/common';
import { Customer } from '../../_models/customer';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.css']
})
export class NewcustomerComponent implements OnInit {
  newCustomer: Customer = new Customer();
  sIdEditMode: string = "";
  isEditMode: Boolean = false;
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    this.customerCreateForm();
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
  cancel() {
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
  // VALIDATION CODES
  customerForm = new FormGroup({
    custName: new FormControl(),
    contactPerson: new FormControl(),
    contactNumber: new FormControl(),
    email: new FormControl(),
    remarks: new FormControl()
  });

  customerCreateForm() {
    this.customerForm = this.fb.group({
      custName: ['', Validators.required],
      contactPerson: [null, Validators.required],
      contactNumber: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      remarks: ['', Validators.maxLength(200)]
    });
  }
}
