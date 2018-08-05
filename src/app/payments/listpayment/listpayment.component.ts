import { Component, OnInit } from '@angular/core';
import { Payment } from '../../_models/payment';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';

@Component({
  selector: 'app-listpayment',
  templateUrl: './listpayment.component.html',
  styleUrls: ['./listpayment.component.css']
})
export class ListpaymentComponent implements OnInit {
  paymentList: Payment[] = [];
  constructor(public db: AngularFireDatabase) { 

    let itemRef = db.object('payments');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.paymentList = [];
      obj.forEach(element => {
        let obj: Payment = JSON.parse(element);
        if (obj.paymentId != undefined) {
          obj.paymentId = obj.paymentId.replace("/", "");
        }
        console.log("payment added")
       
        this.paymentList.push(obj);
      });
    });
  }

  ngOnInit() {
  }


}
