import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects } from './auth.effects';
import { authReducer } from './auth.reducer';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';
import { AppState } from '../app.reducer';

export const AUTH_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('auth reducer');

@NgModule({
   declarations: [SignupComponent, LoginComponent],
   imports: [
      AngularFireAuthModule,
      AuthRoutingModule,
      SharedModule,
      StoreModule.forFeature('auth', AUTH_REDUCER_TOKEN ),
      EffectsModule.forFeature([AuthEffects])
   ],
   exports: [SignupComponent, LoginComponent],
   providers: [{ provide: AUTH_REDUCER_TOKEN, useValue: authReducer }]
})

export class AuthModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: AuthModule,
         providers: [AuthService, AuthGuard]
      };
   }
}

