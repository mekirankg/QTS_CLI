import { Component, OnInit } from '@angular/core';
import { Quotation } from '../_models/quotation';

@Component({

  /* selector: 'app-createquotation', */
  templateUrl: './createquotation.component.html',
  styleUrls: ['./createquotation.component.css']
})
export class CreatequotationComponent implements OnInit {
 newQuotation:Quotation= new Quotation();
  constructor() { }

  ngOnInit() {
   // this.newQuotation.customerContact="9877";
  }
  register() {
    console.log("register");
    console.log(this.newQuotation.customerContact);
  }
}
