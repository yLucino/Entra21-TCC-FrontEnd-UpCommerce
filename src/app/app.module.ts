import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';


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
import { AgilityPracticalityPopUpComponent } from './Components/agility-practicality-pop-up/agility-practicality-pop-up.component';
import { FooterComponent } from './Components/footer/footer.component';

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
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
