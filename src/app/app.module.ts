import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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

// Directives
import { UniqueIdDirective } from './directives/uniqueId-component.directive';

// Drag and Drop Components
import { AreaComponent } from './dragAndDrop/component/area/area.component';
import { TextComponent } from './dragAndDrop/component/text/text.component';
import { InputComponent } from './dragAndDrop/component/input/input.component';
import { ButtonComponent } from './dragAndDrop/component/button/button.component';
import { ImageComponent } from './dragAndDrop/component/image/image.component';
import { IconComponent } from './dragAndDrop/component/icon/icon.component';
import { LinkComponent } from './dragAndDrop/component/link/link.component';
import { DesktopScreenWorkshopComponent } from './Components/desktop-screen-workshop/desktop-screen-workshop.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProfileEditComponent } from './Components/profile-edit/profile-edit.component';
import { ProjectsWorkshopComponent } from './Components/projects-workshop/projects-workshop.component';

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
    ButtonComponent,
    AreaComponent,
    UniqueIdDirective,
    TextComponent,
    InputComponent,
    ImageComponent,
    IconComponent,
    LinkComponent,
    DesktopScreenWorkshopComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProjectsWorkshopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
