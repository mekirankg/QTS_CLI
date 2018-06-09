import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';
import { Salesman } from '../../_models/salesman';

@Component({
  selector: 'app-listsalesman',
  templateUrl: './listsalesman.component.html',
  styleUrls: ['./listsalesman.component.css']
})
export class ListsalesmanComponent implements OnInit {
  salesmanList: Salesman[] = [];
  constructor(public db: AngularFireDatabase) {
    let itemRef = db.object('salesman');
    itemRef.snapshotChanges().subscribe(action => {
      var quatationsList = action.payload.val();
      let obj = Common.snapshotToArray(action.payload);
      this.salesmanList = [];
      obj.forEach(element => {
        let obj: Salesman = JSON.parse(element);
        if (obj.salesmanid != undefined) {
          obj.salesmanid = obj.salesmanid.replace("/", "");
        }
        console.log("supplier added")
       
        this.salesmanList.push(obj);
      });
    });
   }

  ngOnInit() {
  }

}
