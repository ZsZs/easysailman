import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppMaterialModule } from '../app-material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgrxFormsModule } from 'ngrx-forms';
import { NGXLogger } from 'ngx-logger';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './router/router.effects';
import { AuthService } from '../authentication/auth.service';
import { AuthGuard } from '../authentication/auth-guard';
import { BaseFormComponent } from './generic-components/base-form.component';

@NgModule({
   imports: [
      AppMaterialModule,
      CommonModule,
      FlexLayoutModule,
      FormsModule,
      NgrxFormsModule,
      ReactiveFormsModule
   ],
   exports: [
      AppMaterialModule,
      CommonModule,
      FlexLayoutModule,
      FormsModule,
      NgrxFormsModule,
      ReactiveFormsModule
   ],
   providers: [
   ]
})
export class SharedModule {}
