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
import { Component } from './salesman/.component';
import { NewsalesmanComponent } from './salesman/newsalesman/newsalesman.component';
import { ListsalesmanComponent } from './salesman/listsalesman/listsalesman.component';
import { SalesmandetailsComponent } from './salesman/salesmandetails/salesmandetails.component';

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
    SalesmandetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      [
        { path:'createquotation',component:CreatequotationComponent /* , canActivate: [AuthGuard] */ },
        { path:'createquotation/:qid',component:CreatequotationComponent },
        { path:'listquotation',component:ListquotationComponent/*  , canActivate: [AuthGuard] */ },
        { path:'welcome',component:WelcomeComponent },
        {path:'createsupplier',component:NewsupplierComponent},
        { path:'createsupplier/:sid',component:NewsupplierComponent },
        { path:'listpo',component:PurchaseorderlistComponent },
        { path:'newpo/:id',component:NewpurchaseorderComponent },
        { path:'initialpolist',component:InitialpolistComponent },   
        { path:'makepayment/:id',component:MakepaymentComponent },   
        { path:'listpayments',component:ListpaymentComponent },  
        {path:'podetails/:id',component:PurchaseorderdetailsComponent},
        { path:'listsupplier',component:ListsupplierComponent },  
        { path:'supplierdetails/:sid',component:SupplierdetailsComponent},
        { path:'quotationdetails/:qid',component:QuotationdetailsComponent },
        { path:'createsalesman',component:NewsalesmanComponent },
        { path:'createsalesman/:salesmanid',component:NewsalesmanComponent },
        { path:'listsalesman',component:ListsalesmanComponent }, 
        { path:'salesmandetails/:salesmanid',component:SalesmandetailsComponent },    
              
        {path:'login',component:LoginComponent},
        { path: 'homec', component: HomeComponent, canActivate: [AuthGuard] },
        { path: 'register', component: RegisterComponent },
        { path:'',component:DashboardComponent,pathMatch:'full' },
        { path:'**',component:WelcomeComponent ,pathMatch:'full'}
       
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
