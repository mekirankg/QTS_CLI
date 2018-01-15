import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { CreatequotationComponent } from './quotation/createquotation.component';
import { FormStyle } from '@angular/common/src/i18n/locale_data_api';
import { WelcomeComponent } from './welcome/welcome.component';
import { ListquotationComponent } from './quotation/listquotation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatequotationComponent,
    WelcomeComponent,
    ListquotationComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path:'createquotation',component:CreatequotationComponent },
        { path:'listquotation',component:ListquotationComponent },
        { path:'welcome',component:WelcomeComponent }    ,
        { path:'',component:WelcomeComponent,pathMatch:'full' },
        { path:'**',component:WelcomeComponent ,pathMatch:'full'}
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
