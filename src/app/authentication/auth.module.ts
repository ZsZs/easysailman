import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthEffects } from './auth.effects';
import { authReducer } from './auth.reducer';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';

@NgModule({
   declarations: [SignupComponent, LoginComponent],
   imports: [
      AngularFireAuthModule,
      AuthRoutingModule,
      SharedModule,
      StoreModule.forFeature('auth', authReducer ),
      EffectsModule.forFeature([AuthEffects])
   ],
   exports: [SignupComponent, LoginComponent]
})

export class AuthModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: AuthModule,
         providers: [AuthService, AuthGuard]
      };
   }
}

