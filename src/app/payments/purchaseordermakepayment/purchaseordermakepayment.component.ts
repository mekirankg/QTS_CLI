import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from '../../_helpers/common';
import { Quotation } from '../../_models/quotation';
import { AngularFireDatabase } from 'angularfire2/database';
import { PurchaseOrder } from '../../_models/purchaseorder';
import { Supplier } from '../../_models/supplier';
import { Salesman } from '../../_models/salesman';
import { Customer } from '../../_models/customer';
import { Payment } from '../../_models/payment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchaseordermakepayment',
  templateUrl: './purchaseordermakepayment.component.html',
  styleUrls: ['./purchaseordermakepayment.component.css']
})
export class PurchaseordermakepaymentComponent implements OnInit {
  public id: string;
  newQuotation: Quotation = new Quotation();
  newPO: PurchaseOrder = new PurchaseOrder();
  suppliers: Supplier[] = [];
  selectedsupplier: Supplier = new Supplier();
  isEditMode: Boolean = false;
  isLoaded: Boolean = false;
  customerList: Customer[] = [];
  salesmanList: Salesman[] = [];
  selectedSalesMan = new Salesman();
  selectedCustomer = new Customer();
  newpayment = new Payment();
  ngOnInit(): void {

  }
  constructor(private route: ActivatedRoute, private router: Router, public db: AngularFireDatabase, private fb: FormBuilder) {
    this.poMakePayment();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id.toLowerCase().startsWith('p')) {
      this.isEditMode = true;
    }
    let qRef = "JGB-PO-" + new Date().valueOf();
    this.newPO.poRef = qRef;

    let salesmanitemRef = db.object('salesman');
    salesmanitemRef.snapshotChanges().subscribe(action => {
      let salesmanobj = Common.snapshotToArray(action.payload);
      salesmanobj.forEach(element => {
        let obj: Salesman = JSON.parse(element);
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
        let supplierRef = db.object('supplier');
        supplierRef.snapshotChanges().subscribe(action => {
          var supplierList = action.payload.val();
          let obj = Common.snapshotToArray(action.payload);
          obj.forEach(element => {
            let obj: Supplier = JSON.parse(element);
            console.log("****" + element);
            if (obj.sid != undefined) {
              obj.sid = obj.sid.replace("/", "");
            }
            this.suppliers.push(obj);
          });
          this.selectedsupplier = this.suppliers[0];
          if (this.id.toLowerCase().startsWith('p')) {
            this.isEditMode = true;
            let poitemRef = db.object('purchaseorder');
            poitemRef.snapshotChanges().subscribe(action => {
              let poList = Common.snapshotToArray(action.payload);
              poList.forEach(element => {
                let poobj: PurchaseOrder = JSON.parse(element);
                if (poobj.pid != undefined && poobj.pid.endsWith(this.id)) {
                  poobj.qid = poobj.qid.replace("/", "");
                  this.newPO = poobj;
                  // get the quotation for the PO
                  let qitemRef = db.object('quotations');
                  qitemRef.snapshotChanges().subscribe(action => {
                    let qobj = Common.snapshotToArray(action.payload);
                    qobj.forEach(element => {
                      let obj: Quotation = JSON.parse(element);
                      if (obj.qid != undefined && obj.qid.endsWith(this.newPO.qid)) {
                        obj.qid = obj.qid.replace("/", "");
                        this.newQuotation = obj;

                        let salesMan = this.salesmanList.filter(s => s.salesmanid.endsWith(this.newQuotation.salesmanId));
                        if (salesMan.length > 0) {
                          this.selectedSalesMan = salesMan[0]; alert
                        }

                        let custList = this.customerList.filter(item => item.customerId === this.newQuotation.customerId);
                        if (custList.length > 0) {
                          this.selectedCustomer = custList[0];
                        }
                        this.suppliers.forEach(element => {
                          if (element.sid.endsWith(this.newPO.supplierId))
                            this.selectedsupplier = element;
                          this.isLoaded = true;
                        });
                      }
                    });
                  });
                  return;
                }
              });
            });
          }

        });
        if (!this.id.toLowerCase().startsWith('p')) {
          {
            this.isEditMode = false;
            let itemRef = db.object('quotations');
            itemRef.snapshotChanges().subscribe(action => {
              var quatationsList = action.payload.val();
              let obj = Common.snapshotToArray(action.payload);
              obj.forEach(element => {
                let obj: Quotation = JSON.parse(element);
                if (obj.qid != undefined && obj.qid.endsWith(this.id)) {
                  obj.qid = obj.qid.replace("/", "");
                  this.newQuotation = obj;
                  this.newPO.qid = obj.qid;

                  let salesMan = this.salesmanList.filter(s => s.salesmanid.endsWith(obj.salesmanId));
                  if (salesMan.length > 0) {
                    this.selectedSalesMan = salesMan[0];
                  }

                  let custList = this.customerList.filter(item => item.customerId === obj.customerId);
                  if (custList.length > 0) {
                    this.selectedCustomer = custList[0];
                  }
                  this.isLoaded = true;
                  return;
                }
              });
            });
          }
        }
      });
    });
  }

  createPO() {
    if (!this.isEditMode) {
      let uniquePOId = "P" + Common.newGuid();
      console.log("****qid" + this.id);
      this.newPO.pid = uniquePOId;
      this.newPO.qid = this.id;
      this.newPO.supplierId = this.selectedsupplier.sid;
      let newPOJson = JSON.stringify(this.newPO);
      this.newQuotation.status = "PO";
      let quotation = JSON.stringify(this.newQuotation)
      console.log(newPOJson);
      try {

        this.db.database.ref('quotations').child(this.id).set(quotation);
        this.db.database.ref('purchaseorder').child(uniquePOId).set(newPOJson);
        alert("PO added successful!!.");
        this.router.navigate(['/listpo']);
      }
      catch (ex) {
        alert("Error in adding PO");
      }

    } else {
      var updates = {};
      // this.newPO.supplierId = this.selectedsupplier;
      this.newpayment.paymentId = "AMT" + Common.newGuid();
      this.newpayment.poId = this.newPO.pid;
      this.newPO.paymentPercentage = this.newpayment.paymentPercentage;
      if (this.newpayment.paymentPercentage >= 100) {
        this.newPO.Status = "Closed";
      }
      updates['/purchaseorder/' + this.newPO.pid] = JSON.stringify(this.newPO);
      let paymentStr = JSON.stringify(this.newpayment)
      try {
        this.db.database.ref('payments').child(this.newpayment.paymentId).set(paymentStr);
        let up = this.db.database.ref().update(updates);
        alert("Payment updated successfully")
        this.router.navigate(['/popaymentlist']);
      }
      catch (ex) {
        alert("Error in Updating Payment");
      }

    }
  }
  cancel() {
    this.router.navigate(['/popaymentlist']);
  }

  paymentForm = new FormGroup({

    paymentAmount: new FormControl(),
    totalPayment: new FormControl()
  })

  poMakePayment() {
    this.paymentForm = this.fb.group({

      paymentAmount: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      totalPayment: [null, Validators.required]
    })

  }
  get paymentAmount() { return this.paymentForm.get('paymentAmount'); }
  get totalPayment() { return this.paymentForm.get('totalPayment'); }

}
