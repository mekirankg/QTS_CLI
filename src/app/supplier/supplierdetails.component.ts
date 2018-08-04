import { Component, OnInit } from '@angular/core';
import { Supplier } from '../_models/supplier';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Common } from '../_helpers/common';

@Component({
  selector: 'app-supplierdetails',
  templateUrl: './supplierdetails.component.html',
  styleUrls: ['./supplierdetails.component.css']
})
export class SupplierdetailsComponent implements OnInit {
  newSupplier: Supplier = new Supplier();
  
  constructor(public db: AngularFireDatabase, private router: Router, private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get('sid');

    if (id != undefined) {
      let itemRef = db.object('supplier');
      itemRef.snapshotChanges().subscribe(action => {
        var quatationsList = action.payload.val();
        let obj = Common.snapshotToArray(action.payload);
        obj.forEach(element => {
          let obj: Supplier = JSON.parse(element);
          if (obj.sid != undefined && obj.sid.endsWith(id)) {
            obj.sid = obj.sid.replace("/", "");
            this.newSupplier = obj;
          }
        });
        if(this.newSupplier.sid==undefined)
        {         
          alert("Invalid Supplier selected ");
          this.router.navigate(['/listSupplier']);
        }
      });
    }
    else
    {
      alert("Invalid Supplier selected ");
      this.router.navigate(['/listSupplier']);
    }
  }

  ngOnInit() {
  }

}
