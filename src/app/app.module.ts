import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commons/header/header.component';
import { FooterComponent } from './commons/footer/footer.component';
import { LayoutComponent } from './commons/layout/layout.component';
import { HomeComponent } from './commons/layout/home/home.component';
import { OfferComponent } from './commons/layout/offer/offer.component';
import { PricingComponent } from './commons/layout/pricing/pricing.component';
import { ContactComponent } from './commons/layout/contact/contact.component';
import { FaqComponent } from './commons/layout/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
    OfferComponent,
    PricingComponent,
    ContactComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
