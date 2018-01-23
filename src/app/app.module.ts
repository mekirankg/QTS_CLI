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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path:'createquotation',component:CreatequotationComponent },
        { path:'listquotation',component:ListquotationComponent },
        { path:'welcome',component:WelcomeComponent },
        {path:'login',component:LoginComponent},
        { path: '', component: HomeComponent, canActivate: [AuthGuard] },
        { path: 'register', component: RegisterComponent },
        { path:'',component:WelcomeComponent,pathMatch:'full' },
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
