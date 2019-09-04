import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { FormBuilder } from '@angular/forms';
import { UiService } from '../../shared/ui/ui.service';
import { select, Store } from '@ngrx/store';
import * as fromSailorReducer from '../../sailor/sailor.reducer';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import * as fromAppReducer from '../../app.reducer';
import { Sailor } from '../sailor';
import { SailorService } from '../sailor.service';
import { SailorResolver } from '../sailor.resolver';
import { saveSailor } from '../sailor.actions';

@Component({
  selector: 'srm-sailor-details',
  templateUrl: './sailor-details.component.html',
  styleUrls: ['./sailor-details.component.css']
})
export class SailorDetailsComponent implements OnInit {
  formState$: Observable<FormGroupState<Sailor>>;
  submittedValue$: Observable<Sailor | undefined>;
  isLoading: Observable<boolean>;

  constructor( private formBuilder: FormBuilder,
               private raceService: SailorService,
               private uiService: UiService,
               private store: Store<fromSailorReducer.State>,
               private router: Router,
               @Inject( SailorResolver ) private sailor: Observable<Sailor> ) {
    this.formState$ = this.store.pipe( select(state => state.sailorManagement.sailorDetailsForm ));
    this.submittedValue$ = sailor;
  }

  // event handling methods
  ngOnInit() {
    this.subscribeToLoading();
  }

  onCancel() {
    this.router.navigateByUrl( '/sailor' );
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      map(formState => saveSailor( { sailor: formState.value })),
    ).subscribe( this.store );
    this.router.navigateByUrl( '/sailor' );
  }

  // public accessors and mutators

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
