import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { appReducers, AppState, metaReducers } from './app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './authentication/auth.module';
import { AuthService } from './authentication/auth.service';
import { CustomSerializer } from './shared/custom-route-serializer';
import { environment } from '../environments/environment';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { UiService } from './shared/ui.service';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { EffectsModule } from '@ngrx/effects';

export const APP_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('root reducer');

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
    EffectsModule.forRoot([]),
    StoreModule.forRoot( APP_REDUCER_TOKEN, { metaReducers } ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: 'router',  serializer: CustomSerializer })
  ],
  providers: [
    AuthService,
    { provide: APP_REDUCER_TOKEN, useValue: appReducers },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false }},
    { provide: FirestoreSettingsToken, useValue: {} },
    UiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
