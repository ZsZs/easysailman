import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { appReducers, metaReducers } from './app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './authentication/auth.module';
import { AuthService } from './authentication/auth.service';
import { environment } from '../environments/environment';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { UiService } from './shared/ui.service';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './navigation/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    AngularFireModule.initializeApp( environment.firebaseConfig ),
    AngularFirestoreModule,
    AppMaterialModule,
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    StoreModule.forRoot( appReducers, { metaReducers } ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    AuthService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false }},
    { provide: FirestoreSettingsToken, useValue: {} },
    UiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
