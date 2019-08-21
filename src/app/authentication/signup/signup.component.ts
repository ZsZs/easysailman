import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import * as fromAppReducer from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'srm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading: Observable<boolean>;

  constructor( private authService: AuthService, private uiService: UiService, private store: Store<fromAppReducer.AppState> ) { }

  ngOnInit() {
    this.subscribeToLoading();
    this.maxDate = new Date();
    this.maxDate.setFullYear( this.maxDate.getFullYear() - 18 );
  }

  onSubmit( form: NgForm ) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
