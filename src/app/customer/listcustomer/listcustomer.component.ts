import { Component, OnInit } from '@angular/core';
import { Customer } from '../../_models/customer';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';

@Component({
  selector: 'app-listcustomer',
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.css']
})
export class ListcustomerComponent implements OnInit {
  customerList: Customer[] = [];
  constructor(public db: AngularFireDatabase) {
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

}