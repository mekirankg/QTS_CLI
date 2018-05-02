import { Component, OnInit } from '@angular/core';
import { Quotation } from '../_models/quotation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Common } from '../_helpers/common';

@Component({

  /* selector: 'app-createquotation', */
  templateUrl: './createquotation.component.html',
  styleUrls: ['./createquotation.component.css']
})
export class CreatequotationComponent implements OnInit {
  newQuotation: Quotation = new Quotation();
  dbOperator: any;
  isEditMode: boolean = false;
  qIdEditMode: string = undefined;
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    this.dbOperator = db;
    let id = this.route.snapshot.paramMap.get('qid');

    if (id != undefined) {
      this.qIdEditMode = id;
      this.isEditMode = true;
      let itemRef = db.object('quotations');
      itemRef.snapshotChanges().subscribe(action => {
        var quatationsList = action.payload.val();
        let obj = Common.snapshotToArray(action.payload);
        obj.forEach(element => {
          let obj: Quotation = JSON.parse(element);
          if (obj.qid != undefined && obj.qid.endsWith(id)) {
            obj.qid = obj.qid.replace("/", "");
            this.newQuotation = obj;
          }
        });
      });
    }
  }

  ngOnInit() {
  }
  register() {
    if (this.isEditMode) {
      var updates = {};
      updates['/quotations/' + this.newQuotation.qid] = JSON.stringify(this.newQuotation);
      try {
        let up = this.db.database.ref().update(updates);
        this.router.navigate(['/listquotation']);
      }
      catch (ex) {
        alert("Error in Updating Quotation");
      }
    }
    else {
      let uniqueId = "/Q" + Common.newGuid();
      console.log("****" + uniqueId);
      this.newQuotation.qid = uniqueId;
      let newQuotationJson = JSON.stringify(this.newQuotation);
      console.log(newQuotationJson);
      try {
        this.db.database.ref('quotations').child(uniqueId).set(newQuotationJson);
        alert("Quotation added successful!!. This message box temporary");
        this.router.navigate(['/listquotation']);
      }
      catch (ex) {
        alert("Error in adding Quotation");
      }
    }
  }


}
