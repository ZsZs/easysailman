import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../app-material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
   imports: [
      AppMaterialModule,
      CommonModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule
   ],
   exports: [
      AppMaterialModule,
      CommonModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule
   ]
})
export class SharedModule {}
