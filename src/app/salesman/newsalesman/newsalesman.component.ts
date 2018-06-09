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
 // isEditMode: Boolean = false;
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
  }
  create() {

   // if (this.isEditMode) {
   //   var updates = {};
   //   updates['/salesman/' + this.newSalesman.sid] = JSON.stringify(this.newSupplier);
   //   try {
   ///     let up = this.db.database.ref().update(updates);
//this.router.navigate(['/listsupplier']);
   //   }
   //   catch (ex) {
  //      alert("Error in Updating Quotation");
  //    }
  //  }
   // else
     {
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
