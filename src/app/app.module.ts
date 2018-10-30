import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { CreatequotationComponent } from './quotation/createquotation.component';
import { FormStyle } from '@angular/common/src/i18n/locale_data_api';
import { WelcomeComponent } from './welcome/welcome.component';
import { ListquotationComponent } from './quotation/listquotation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';


import { fakeBackendProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { RegisterComponent } from './register/index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PurchaseorderlistComponent } from './purchaseorder/purchaseorderlist/purchaseorderlist.component';
import { NewpurchaseorderComponent } from './purchaseorder/newpurchaseorder/newpurchaseorder.component';
import { InitialpolistComponent } from './purchaseorder/initialpolist/initialpolist.component';
import { MakepaymentComponent } from './payments/makepayment/makepayment.component';
import { ListpaymentComponent } from './payments/listpayment/listpayment.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { QuotationdetailsComponent } from './quotation/quotationdetails.component';
import { NewsupplierComponent } from './supplier/newsupplier.component';
import { ListsupplierComponent } from './supplier/listsupplier.component';
import { SupplierdetailsComponent } from './supplier/supplierdetails.component';
import { PurchaseorderdetailsComponent } from './purchaseorder/purchaseorderdetails/purchaseorderdetails.component';

import { NewsalesmanComponent } from './salesman/newsalesman/newsalesman.component';
import { ListsalesmanComponent } from './salesman/listsalesman/listsalesman.component';
import { SalesmandetailsComponent } from './salesman/salesmandetails/salesmandetails.component';
import { NewcustomerComponent } from './customer/newcustomer/newcustomer.component';
import { ListcustomerComponent } from './customer/listcustomer/listcustomer.component';
import { CustomerdetailsComponent } from './customer/customerdetails/customerdetails.component';
import { PurchaseorderpaymentsComponent } from './payments/purchaseorderpayments/purchaseorderpayments.component';
import { PurchaseordermakepaymentComponent } from './payments/purchaseordermakepayment/purchaseordermakepayment.component';

// validation import class
import { ReactiveFormsModule } from '@angular/forms';
import { CreateuserComponent } from './users/createuser/createuser.component';
import { ListuserComponent } from './users/listuser/listuser.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatequotationComponent,
    WelcomeComponent,
    ListquotationComponent,
    SidebarComponent,    
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PurchaseorderlistComponent,
    NewpurchaseorderComponent,
    InitialpolistComponent,
    MakepaymentComponent,
    ListpaymentComponent,
    QuotationdetailsComponent,
    NewsupplierComponent,
    ListsupplierComponent,
    SupplierdetailsComponent,
    PurchaseorderdetailsComponent,
    NewsalesmanComponent,
    ListsalesmanComponent,
    SalesmandetailsComponent,
    NewcustomerComponent,
    ListcustomerComponent,
    CustomerdetailsComponent,
    PurchaseorderpaymentsComponent,
    PurchaseordermakepaymentComponent,
    CreateuserComponent,
    ListuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      [
        { path:'createquotation',component:CreatequotationComponent , canActivate: [AuthGuard]/* , canActivate: [AuthGuard] */ },
        { path:'createquotation/:qid',component:CreatequotationComponent , canActivate: [AuthGuard]},
        { path:'listquotation',component:ListquotationComponent, canActivate: [AuthGuard]/*  , canActivate: [AuthGuard] */ },
        { path:'welcome',component:WelcomeComponent, canActivate: [AuthGuard] },
        {path:'createsupplier',component:NewsupplierComponent, canActivate: [AuthGuard]},
        { path:'createsupplier/:sid',component:NewsupplierComponent , canActivate: [AuthGuard]},
        { path:'listpo',component:PurchaseorderlistComponent , canActivate: [AuthGuard]},    
        { path:'popaymentlist',component:PurchaseorderpaymentsComponent, canActivate: [AuthGuard] },    
        { path:'newpo/:id',component:NewpurchaseorderComponent, canActivate: [AuthGuard] },
        { path:'initialpolist',component:InitialpolistComponent , canActivate: [AuthGuard]},   
        { path:'makepayment/:id',component:MakepaymentComponent , canActivate: [AuthGuard]},   
        { path:'listpayments',component:ListpaymentComponent , canActivate: [AuthGuard]},  
        {path:'podetails/:id',component:PurchaseorderdetailsComponent, canActivate: [AuthGuard]},        
        {path:'pomakepayment/:id',component:PurchaseordermakepaymentComponent, canActivate: [AuthGuard]},
        { path:'listsupplier',component:ListsupplierComponent , canActivate: [AuthGuard]},  
        { path:'supplierdetails/:sid',component:SupplierdetailsComponent, canActivate: [AuthGuard]},
        { path:'quotationdetails/:qid',component:QuotationdetailsComponent , canActivate: [AuthGuard]},
        { path:'createsalesman',component:NewsalesmanComponent , canActivate: [AuthGuard]},
        { path:'createsalesman/:salesmanid',component:NewsalesmanComponent , canActivate: [AuthGuard]},
        { path:'listsalesman',component:ListsalesmanComponent , canActivate: [AuthGuard]}, 
        { path:'salesmandetails/:salesmanid',component:SalesmandetailsComponent, canActivate: [AuthGuard] },
        { path:'createcustomer',component:NewcustomerComponent , canActivate: [AuthGuard]},
        { path:'createcustomer/:customerid',component:NewcustomerComponent , canActivate: [AuthGuard]},
        { path:'createuser/:userid',component:CreateuserComponent , canActivate: [AuthGuard]},
        { path:'createuser',component:CreateuserComponent , canActivate: [AuthGuard]},
        { path:'customerdetails/:customerid',component:CustomerdetailsComponent, canActivate: [AuthGuard] },
        { path:'listcustomer',component:ListcustomerComponent , canActivate: [AuthGuard]}, 
        { path:'listuser',component:ListuserComponent , canActivate: [AuthGuard]}, 
        {path:'login',component:LoginComponent},
        { path: 'homec', component: HomeComponent, canActivate: [AuthGuard] },
        { path: 'register', component: RegisterComponent },
        { path:'dashboard',component:DashboardComponent,pathMatch:'full', canActivate: [AuthGuard] },
        { path:'**',component:LoginComponent ,pathMatch:'full'}
       
      ]
    )
  ],
  
providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },

    // provider used to create fake backend
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
