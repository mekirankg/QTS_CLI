import { Component, OnInit } from '@angular/core';
import { Salesman } from '../../_models/salesman';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Common } from '../../_helpers/common';

@Component({
  selector: 'app-newsalesman',
  templateUrl: './newsalesman.component.html',
  styleUrls: ['./newsalesman.component.css']
})
export class NewsalesmanComponent implements OnInit {
  newSalesman: Salesman = new Salesman();
  sIdEditMode: string = "";
  isEditMode: Boolean = false;
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('salesmanid');
    if (id != undefined) {
      this.sIdEditMode = id;
      this.isEditMode = true;
      let itemRef = db.object('salesman');
      itemRef.snapshotChanges().subscribe(action => {
        var quatationsList = action.payload.val();
        let obj = Common.snapshotToArray(action.payload);
        obj.forEach(element => {
          let obj: Salesman = JSON.parse(element);
          if (obj.salesmanid != undefined && obj.salesmanid.endsWith(id)) {
            obj.salesmanid = obj.salesmanid.replace("/", "");
            this.newSalesman = obj;
          }
        });
        if (this.newSalesman.salesmanid == undefined) {
          alert("Invalid quotation selected for edit...");
          this.router.navigate(['/listquotation']);
        }
      });
    }
  }

  ngOnInit() {
  }
  cancel() {

    this.router.navigate(['/listsalesman'])
  }
  create() {

    if (this.isEditMode) {
      var updates = {};
      updates['/salesman/' + this.newSalesman.salesmanid] = JSON.stringify(this.newSalesman);
      try {
        let up = this.db.database.ref().update(updates);
        alert("Salesman updated successfully!!.");
        this.router.navigate(['/listsalesman']);
      }
      catch (ex) {
        alert("Error in Updating Quotation");
      }
    }
    else {
      let uniqueId = "/SM" + Common.newGuid();
      this.newSalesman.salesmanid = uniqueId;
      let newSalesmanJson = JSON.stringify(this.newSalesman);
      console.log(newSalesmanJson);
      try {
        this.db.database.ref('salesman').child(uniqueId).set(newSalesmanJson);
        alert("Salesman added successfully!!.");
        // this.router.navigate(['/listsupplier']);
      }
      catch (ex) {

      }
    }
  }
}
