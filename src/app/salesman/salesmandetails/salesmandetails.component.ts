import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Common } from '../../_helpers/common';
import { Salesman } from '../../_models/salesman';

@Component({
  selector: 'app-salesmandetails',
  templateUrl: './salesmandetails.component.html',
  styleUrls: ['./salesmandetails.component.css']
})
export class SalesmandetailsComponent implements OnInit {
  newSalesman: Salesman = new Salesman();
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('salesmanid');
    if (id != undefined) {
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
        if(this.newSalesman.salesmanid==undefined)
        {         
          alert("Invalid salesman selected ");
          this.router.navigate(['/listsalesman']);
        }
      });
    }
    else
    {
      alert("Invalid Supplier selected ");
      this.router.navigate(['/listsalesman']);
    }
   }

  ngOnInit() {
  }
  delete(key, sale:Salesman)
  {
    this.db.database.ref(`salesman/${key}`).once("value", snapshot => {
      let sid = snapshot.key;
      if (snapshot.exists()) {
        alert('Do you want to delete the record ?');
        sale.isDeleted = true;
        var updates = {};
        updates['/salesman/' + sid] = JSON.stringify(sale);
        try {
          let up = this.db.database.ref().update(updates);
          this.router.navigate(['/listsalesman']);
        }
        catch (ex) {
          alert("Error in Deleting salesman");
        }
      }
    })
  }

}
