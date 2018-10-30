import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  shouldShow:boolean=false;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
   // alert('sidebar'+ this.authService.isLoggedIn);
    this.isLoggedIn$ = this.authService.isLoggedIn;
    let loggedIn = new BehaviorSubject<boolean>(false);
    if (localStorage.getItem('currentUser')) {
      loggedIn.next(true);
      this.isLoggedIn$ = loggedIn.asObservable(); 
      this.shouldShow=true;
     this.authService.setisLoggedInTrue;      
    }
   
    
  }


}
