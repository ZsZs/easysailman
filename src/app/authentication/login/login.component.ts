import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import * as fromAppReducer from '../../app.reducer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'srm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: Observable<boolean>;
  private redirectTo: string;

  constructor( private authService: AuthService, private uiService: UiService, private store: Store<fromAppReducer.AppState>, private activatedRoute: ActivatedRoute, private router: Router ) {}

  ngOnInit() {
    this.subscribeToLoading();
    this.buildLoginForm();
    this.determineRedirect();
  }

  onSubmit( ) {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  // protected, private helper methods
  private buildLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl( '', {validators: [ Validators.required, Validators.email ]}),
      password: new FormControl( '', {validators: [ Validators.required ]})
    });
  }

  private determineRedirect() {
    this.activatedRoute.queryParams.subscribe(( params: { returnTo: string }) => {
      this.redirectTo = params.returnTo;
    });
  }

  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
