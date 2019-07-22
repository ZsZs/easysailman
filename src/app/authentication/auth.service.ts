import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data';
import { UiService } from '../shared/ui.service';
import * as fromAppReducer from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { startLoading, stopLoading } from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
     private router: Router,
     private afAuth: AngularFireAuth,
     private uiService: UiService,
     private store: Store<fromAppReducer.AppState> ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe( user => {
      if ( user ) {
        this.authSuccess();
      } else {
        this.authFailed();
      }
    });
  }

  login( authData: AuthData ) {
    this.store.dispatch( startLoading() );
    this.afAuth.auth.signInWithEmailAndPassword( authData.email, authData.password )
       .then( result => {
         this.store.dispatch( stopLoading() );
         this.authSuccess();
       })
       .catch( error => {
         this.store.dispatch( stopLoading() );
         this.uiService.showSnackbar( error.message, null, 5000 );
         this.authFailed();
       });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch( new Auth.SetUnAuthenticated() );
    this.router.navigate(['/']);
  }


  registerUser( authData: AuthData ) {
    this.store.dispatch( startLoading() );
    this.afAuth.auth.createUserWithEmailAndPassword( authData.email, authData.password )
       .then( result => {
         this.store.dispatch( stopLoading() );
       })
       .catch( error => {
         this.store.dispatch( stopLoading() );
         this.uiService.showSnackbar( error.message, null, 5000 );
       });
  }

  // protected, private helper methods
  private authFailed() {
    this.store.dispatch( new Auth.SetUnAuthenticated() );
    this.router.navigate(['/login']);
  }

  private authSuccess() {
    this.store.dispatch( new Auth.SetAuthenticated() );
    this.router.navigate(['/']);
  }
}
