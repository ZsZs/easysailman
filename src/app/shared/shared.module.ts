import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppMaterialModule } from '../app-material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgrxFormsModule } from 'ngrx-forms';

@NgModule({
   declarations: [
   ],
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
