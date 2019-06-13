import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SectionOneComponent } from './section-one/section-one.component';
import { FooterComponent } from './footer/footer.component';

import { EmailService } from './section-one/emails.service';
import { SectionServiceComponent } from './section-service/section-service.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionOneComponent,
    FooterComponent,
    SectionServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
