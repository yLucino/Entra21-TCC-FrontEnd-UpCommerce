import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/main/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { HeaderComponent } from './Components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './Pages/main/about/about.component';
import { MainComponent } from './Pages/main/main.component';
import { ServicesComponent } from './Pages/main/services/services.component';
import { ContactsComponent } from './Pages/main/contacts/contacts.component';
import { PlansComponent } from './Pages/main/plans/plans.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { LibraryLayoutsComponent } from './Pages/library-layouts/library-layouts.component';
import { AgilityPracticalityPopUpComponent } from './Components/agility-practicality-pop-up/agility-practicality-pop-up.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BtnBackToTopComponent } from './Components/btn-back-to-top/btn-back-to-top.component';
import { PlanSuportComponent } from './Components/plan-suport/plan-suport.component';
import { PlanPaymentComponent } from './Components/plan-payment/plan-payment.component';
import { PlanConfirmationComponent } from './Components/plan-confirmation/plan-confirmation.component';
import { CreateLayoutsComponent } from './Pages/create-layouts/create-layouts.component';
import { NavBarWorkshopComponent } from './Components/nav-bar-workshop/nav-bar-workshop.component';
import { CardLayoutsComponent } from './Components/card-layouts/card-layouts.component';
import { HeaderWorkshopComponent } from './Components/header-workshop/header-workshop.component';
import { ToolsWorkshopComponent } from './Components/tools-workshop/tools-workshop.component';
import { SmartphoneScreenWorkshopComponent } from './Components/smartphone-screen-workshop/smartphone-screen-workshop.component';
import { PropertiesWorkshopComponent } from './Components/properties-workshop/properties-workshop.component';
import { ButtonDragComponent } from './dragAnDrop/button-drag/button-drag.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    AboutComponent,
    MainComponent,
    ServicesComponent,
    ContactsComponent,
    PlansComponent,
    RegisterComponent,
    AgilityPracticalityPopUpComponent,
    NavBarComponent,
    FooterComponent,
    BtnBackToTopComponent,
    LibraryLayoutsComponent,
    PlanSuportComponent,
    PlanPaymentComponent,
    PlanConfirmationComponent,
    CreateLayoutsComponent,
    NavBarWorkshopComponent,
    CardLayoutsComponent,
    HeaderWorkshopComponent,
    ToolsWorkshopComponent,
    SmartphoneScreenWorkshopComponent,
    PropertiesWorkshopComponent,
    ButtonDragComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
