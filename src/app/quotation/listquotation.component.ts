import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Quotation } from '../_models/quotation';
import { Observable } from 'rxjs/Observable';
@Component({
  /* selector: 'app-listquotation', */
  templateUrl: './listquotation.component.html',
  styleUrls: ['./listquotation.component.css']
})
export class ListquotationComponent implements OnInit {
  quotations: Quotation[] = [];
  constructor(public db: AngularFireDatabase) {


    // this.db.list('/items').push({ content: "new added content" });
    // this.quotations = this.db.list('/quotations').();
    let itemRef = db.object('quotations');

    itemRef.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key);

      var quatationsList = action.payload.val();
      // console.log(this.quotations[0].customerName)
      // console.log(quatationsList);
      let obj = this.snapshotToArray(action.payload);
      this.quotations = [];
      obj.forEach(element => {

        let obj: Quotation = JSON.parse(element);
        console.log("****" + element);
        this.quotations.push(obj);

      });

    });

  }


  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      //   item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  };
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
