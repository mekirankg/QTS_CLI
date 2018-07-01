import { Component, OnInit } from '@angular/core';
import { Quotation } from '../_models/quotation';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../_helpers/common';
import { Salesman } from '../_models/salesman';
import { Customer } from '../_models/customer';

@Component({
  selector: 'app-quotationdetails',
  templateUrl: './quotationdetails.component.html',
  styleUrls: ['./quotationdetails.component.css']
})
export class QuotationdetailsComponent implements OnInit {
  quotations: Quotation[] = [];
  newQuotation: Quotation = new Quotation();
  isEditable: Boolean = false;
  salesmanName: string = "";
  selectedCustomer: Customer = new Customer();
  customerList: Customer[] = [];
  salesmanList: Salesman[] = [];
  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {
    let id = this.route.snapshot.paramMap.get('qid');
    console.log("***" + id);
    let qReference = db.object('quotations');

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


        qReference.snapshotChanges().subscribe(action => {
          console.log(action.type);
          console.log(action.key);

          var quatationsList = action.payload.val();
          // console.log(this.quotations[0].customerName)
          // console.log(quatationsList);
          let obj = Common.snapshotToArray(action.payload);
          this.quotations = [];
          obj.forEach(element => {

            let obj: Quotation = JSON.parse(element);
            console.log("****" + element);
            if (obj.qid != undefined && obj.qid.endsWith(id)) {
              obj.qid = obj.qid.replace("/", "");
              this.newQuotation = obj;

              let salesMan = this.salesmanList.filter(s => s.salesmanid.endsWith(obj.salesmanId));
              if (salesMan.length > 0) {
                this.salesmanName = salesMan[0].salesmanName;
              }

              let custList = this.customerList.filter(item => item.customerId === obj.customerId);
              if (custList.length > 0) {
                this.selectedCustomer = custList[0];
              }
              if (obj.status == 'PO') {
                this.isEditable = false;
              } else {
                this.isEditable = true;
              }
              return;

            }
          });
        });
      });
    });
  }

  ngOnInit() {
  }

}
