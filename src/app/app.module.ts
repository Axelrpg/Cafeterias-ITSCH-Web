import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './components/login/login.component';


import { ReactiveFormsModule } from '@angular/forms';
import{AngularFireModule}from '@angular/fire/compat';
import { AdminCaf1Component } from './components/admin-caf1/admin-caf1.component';
import { AdminCaf2Component } from './components/admin-caf2/admin-caf2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminCaf1Component,
    AdminCaf2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
