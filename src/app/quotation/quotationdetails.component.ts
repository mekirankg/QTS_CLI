import { Component, OnInit } from '@angular/core';
import { Quotation } from '../_models/quotation';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-quotationdetails',
  templateUrl: './quotationdetails.component.html',
  styleUrls: ['./quotationdetails.component.css']
})
export class QuotationdetailsComponent implements OnInit {
  quotations: Quotation[] = [];
  newQuotation: Quotation = new Quotation();
  constructor( private route: ActivatedRoute, public db: AngularFireDatabase) { 
    let id= this.route.snapshot.paramMap.get('qid');
    console.log("***"+id);
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
        if(obj.qid != undefined && obj.qid.endsWith(id))
        {
          obj.qid = obj.qid.replace("/","");
          this.newQuotation=obj;
          console.log("*****"+obj);
        }
       // this.quotations.push(obj);

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

}
