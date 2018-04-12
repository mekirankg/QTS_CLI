import { Component, OnInit } from '@angular/core';
import { Quotation } from '../_models/quotation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({

  /* selector: 'app-createquotation', */
  templateUrl: './createquotation.component.html',
  styleUrls: ['./createquotation.component.css']
})
export class CreatequotationComponent implements OnInit {
  newQuotation: Quotation = new Quotation();
  dbOperator: any;
  constructor(public db: AngularFireDatabase, private router: Router) {
    this.dbOperator = db;
  }

  ngOnInit() {
    // this.newQuotation.customerContact="9877";
  }
  register() {
    let newQuotationJson = JSON.stringify(this.newQuotation);
    console.log(newQuotationJson);
    let uniqueId = "/Q" + this.newGuid();;
    console.log("****" + uniqueId);
    //this.db.list('/quotations').push({ content: newQuotationJson });
    try {
      this.db.database.ref('quotations').child(uniqueId).set(newQuotationJson);
      alert("Quotation added successful!!. This message box temporary");
      this.router.navigate(['/listquotation']);
    }
    catch (ex) {

    }
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
