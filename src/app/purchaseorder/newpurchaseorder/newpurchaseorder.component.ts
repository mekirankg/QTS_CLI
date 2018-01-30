import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newpurchaseorder',
  templateUrl: './newpurchaseorder.component.html',
  styleUrls: ['./newpurchaseorder.component.css']
})

export class NewpurchaseorderComponent implements OnInit {
  public id: string;
  ngOnInit(): void {

  }

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }
}
