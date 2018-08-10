import { Component, OnInit } from '@angular/core';
import { Salesman } from '../../_models/salesman';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Common } from '../../_helpers/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formControlBinding } from '../../../../node_modules/@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-newsalesman',
  templateUrl: './newsalesman.component.html',
  styleUrls: ['./newsalesman.component.css']
})
export class NewsalesmanComponent implements OnInit {
  newSalesman: Salesman = new Salesman();
  sIdEditMode: string = "";
  isEditMode: Boolean = false;
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.salesmanCreateForm();
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
  //validation
  salesmanForm = new FormGroup(
    {
      salesmanName: new FormControl(),
      salesmanContact: new FormControl(),
      salesmanContactNumber: new FormControl(),
      salesmanEmail: new FormControl(),
      remarks: new FormControl()

    }
  );


  salesmanCreateForm() {
    this.salesmanForm = this.fb.group(
      {

        salesmanName: [null, Validators.required],
        salesmanContact: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')])],
        salesmanEmail: [null, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
        remarks: [null,Validators.maxLength(200)]

      }
      
    );

  }
  
  get salesmanName() { return this.salesmanForm.get('salesmanName'); }
  get salesmanContact() { return this.salesmanForm.get('salesmanContact'); }
  get salesmanEmail() { return this.salesmanForm.get('salesmanEmail'); }
  get remarks() { return this.salesmanForm.get('remarks'); }

}
