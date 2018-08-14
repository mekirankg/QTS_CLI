import { Component, OnInit } from '@angular/core';
import { Quotation } from '../_models/quotation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Common } from '../_helpers/common';
import { Salesman } from '../_models/salesman';
import { Customer } from '../_models/customer';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({

  /* selector: 'app-createquotation', */
  templateUrl: './createquotation.component.html',
  styleUrls: ['./createquotation.component.css']
})
export class CreatequotationComponent implements OnInit {



  shouldShowContent: boolean = false;
  newQuotation: Quotation = new Quotation();
  dbOperator: any;
  isEditMode: boolean = false;
  qIdEditMode: string = undefined;
  salesmanList: Salesman[] = [];
  customerList: Customer[] = [];
  selectedsalesman: string = "";
  selectedCustomer: Customer = new Customer();
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    this.quotationCreateForm();
    this.dbOperator = db;
    let id = this.route.snapshot.paramMap.get('qid');

    if (id != undefined) {
      this.qIdEditMode = id;
      this.isEditMode = true;
    }
    else {

      let qRef = "JGB-QUT-" + new Date().valueOf();
      this.newQuotation.quotationReference = qRef;
      let followUpdate = (new Date(Date.now() + 12096e5));
      this.newQuotation.nextFollowupdate = this.formatDate(followUpdate);
    }
    let salesmanitemRef = db.object('salesman');
    salesmanitemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      obj.forEach(element => {
        let obj: Salesman = JSON.parse(element);
        obj.salesmanid = obj.salesmanid.replace("/", "");
        this.salesmanList.push(obj);
      });

      let customeritemRef = db.object('customer');
      customeritemRef.snapshotChanges().subscribe(action => {
        let obj = Common.snapshotToArray(action.payload);
        obj.forEach(element => {
          let obj: Customer = JSON.parse(element);
          obj.customerId = obj.customerId.replace("/", "");
          this.customerList.push(obj);

        });
        this.shouldShowContent = true;
        if (this.customerList.length > 0) {
          this.selectedCustomer = this.customerList[0];
        }
        if (this.salesmanList.length > 0) {
          this.selectedsalesman = this.salesmanList[0].salesmanid;
        }
        if (id != undefined) {
          let itemRef = db.object('quotations');
          itemRef.snapshotChanges().subscribe(action => {
            var quatationsList = action.payload.val();
            let obj = Common.snapshotToArray(action.payload);
            obj.forEach(element => {
              let obj: Quotation = JSON.parse(element);
              if (obj.qid != undefined && obj.qid.endsWith(id)) {
                obj.qid = obj.qid.replace("/", "");
                this.newQuotation = obj;
                let salesMans = this.salesmanList.filter(item => item.salesmanid === obj.salesmanId);
                if (salesMans.length > 0) {
                  this.selectedsalesman = salesMans[0].salesmanid;
                }
                let custList = this.customerList.filter(item => item.customerId === obj.customerId);
                if (custList.length > 0) {
                  this.selectedCustomer = custList[0];
                }
              }
            });
            if (this.newQuotation.qid == undefined) {
              alert("Invalid quotation selected for edit...");
              this.router.navigate(['/listquotation']);
            }
          });
        }

      });
    });

  }

  ngOnInit() {
  }
  register() {
    this.newQuotation.salesmanId = this.selectedsalesman;
    this.newQuotation.customerId = this.selectedCustomer.customerId;
    if (this.isEditMode) {
      var updates = {};
      updates['/quotations/' + this.newQuotation.qid] = JSON.stringify(this.newQuotation);
      try {
        let up = this.db.database.ref().update(updates);

        if (this.newQuotation.status == "PO") {
          alert("Quotation added as initial PO. Please continue to add more details to the PO");
          this.router.navigate(['/newpo', this.newQuotation.qid]);
        }
        else {
          alert("Quotation updated successfully");
          this.router.navigate(['/listquotation']);
        }
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
        alert("Quotation added successful!!. ");
        this.router.navigate(['/listquotation']);
      }
      catch (ex) {
        alert("Error in adding Quotation");
      }
    }
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  cancel() {
    this.router.navigate(['/listquotation']);
  }

  //validation codes

  quotationForm = new FormGroup(
    {
      customerName: new FormControl(),
      SalesmanName: new FormControl(),
      totalValue: new FormControl(),
      materialDesc: new FormControl(),
      status: new FormControl(),
      remarks: new FormControl()
    }
  );
  quotationCreateForm() {
    this.quotationForm = this.fb.group(
      {
        customerName: [null, Validators.required]
      }
    );

  }
  get customerName() { return this.quotationForm.get('customerName'); }



}
