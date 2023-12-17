import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiteTestComponent } from './mite-test/mite-test.component';

import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './header/header.component';
import { TimerComponent } from './timer/timer.component';
import { WorkingOnComponent } from './working-on/working-on.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectNameSelectedPipe } from './pipes/project-name.pipe';
import { CompanyNamePipe } from './pipes/company-name.pipe';
import { ProjectCodePipe } from './pipes/project-code.pipe';
import { ServiceNamePipe } from './pipes/service-name.pipe';
import { ConditionalFlagPipe } from './pipes/conditional-country-flag.pipe';
import { CardComponent } from './card/card.component';
import { ChartModule } from 'primeng/chart';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@NgModule({
  declarations: [
    AppComponent,
    MiteTestComponent,
    HeaderComponent,
    TimerComponent,
    WorkingOnComponent,
    ProjectNameSelectedPipe,
    CompanyNamePipe,
    ProjectCodePipe,
    ServiceNamePipe,
    ConditionalFlagPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartModule,
    CascadeSelectModule,
    CardComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
