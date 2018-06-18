import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Quotation, QuotationList } from '../_models/quotation';
import { Observable } from 'rxjs/Observable';
import { Common } from '../_helpers/common';
import { Salesman } from '../_models/salesman';
import { Customer } from '../_models/customer';
@Component({
  /* selector: 'app-listquotation', */
  templateUrl: './listquotation.component.html',
  styleUrls: ['./listquotation.component.css']
})
export class ListquotationComponent implements OnInit {
  quotationList: QuotationList[] = [];
  quotations: Quotation[] = [];
  salesmanList: Salesman[] = [];
  customerList: Customer[] = [];
  constructor(public db: AngularFireDatabase) {

    let salesmanitemRef = db.object('salesman');
    salesmanitemRef.snapshotChanges().subscribe(action => {
      let salesmanobj = Common.snapshotToArray(action.payload);
      salesmanobj.forEach(element => {
        let obj: Salesman = JSON.parse(element);
        this.salesmanList.push(obj);
      });

      let customeritemRef = db.object('customer');
      customeritemRef.snapshotChanges().subscribe(action => {
        let customerobj = Common.snapshotToArray(action.payload);
        customerobj.forEach(element => {
          let custobj: Customer = JSON.parse(element);
          this.customerList.push(custobj);
        });

        let itemRef = db.object('quotations');
        itemRef.snapshotChanges().subscribe(action => {
          console.log(action.type);
          console.log(action.key);
          var quatationsList = action.payload.val();
          let quotationobj = Common.snapshotToArray(action.payload);
          quotationobj.forEach(element => {
            let quotationListItem = new QuotationList();
            let qobj: Quotation = JSON.parse(element);
            console.log("****" + element);
            if (qobj.qid != undefined) {
              qobj.qid = qobj.qid.replace("/", "");
            }
            if (qobj.status != "PO") {
              quotationListItem.quotation = qobj;
              let salesMan = this.salesmanList.filter(s => s.salesmanid.endsWith(qobj.salesmanId));
              if (salesMan.length > 0) {
                quotationListItem.salesman = salesMan[0];
              }
              let custList = this.customerList.filter(s => s.customerId.endsWith(qobj.customerId));
              if (custList.length > 0) {
                quotationListItem.customer = custList[0];
              }
              
              this.quotationList.push(quotationListItem);
            }
          });

        });
      });

    });





  }



  ngOnInit() {
  }
  /*
    quotations: any[] = [
      {
  "customerName":"Name1",
  "customerContact":"123456789",
  //"quotationName":"qname2",
  "salesmanName":"salesman1",
  "totalvalue":"12345",
  "status":"status1",
  "nextFollowupdate":"01-02-18",
  "remarks":"This is a remark about this quotation"
      },
      {
        "customerName":"Name2",
        "customerContact":"123456789",
     //   "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18"
      },
      {
        "customerName":"Name3",
        "customerContact":"123456789",
    //    "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18"      ,
  "remarks":"This is a remark about this quotation"
      },
      {
        "customerName":"Name4",
        "customerContact":"123456789",
     //   "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18"
      },
      {
        "customerName":"Name5",
        "customerContact":"123456789",
     //   "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18",
        "remarks":"This is a remark about this quotation"
      },
      {
        "customerName":"Name6",
        "customerContact":"123456789",
     //   "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18"
      },
      {
        "customerName":"Name7",
        "customerContact":"123456789",
    ///    "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18",
        "remarks":"This is a remark about this quotation"
      },
      {
        "customerName":"Name8",
        "customerContact":"123456789",
    //    "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18",
        "remarks":"This is a remark about this quotation"
      },
      {
        "customerName":"Name9",
        "customerContact":"123456789",
     //   "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18"
      },
      {
        "customerName":"Name10",
        "customerContact":"123456789",
    //    "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18",
        "remarks":"This is a remark about this quotation"
      },
      {
        "customerName":"Name11",
        "customerContact":"123456789",
     //   "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18",
        "remarks":"This is a remark about this quotation"
      },
      {
        "customerName":"Name12",
        "customerContact":"123456789",
     //   "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18"
      },
      {
        "customerName":"Name13",
        "customerContact":"123456789",
     //   "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18",
        "remarks":"This is a remark about this quotation"
      },
      {
        "customerName":"Name14",
        "customerContact":"123456789",
     //   "quotationName":"qname1",
        "salesmanName":"salesman1",
        "totalvalue":"12345",
        "status":"status1",
        "nextFollowupdate":"01-02-18",
        "remarks":"This is a remark about this quotation"
      }
    ];
  */

}
