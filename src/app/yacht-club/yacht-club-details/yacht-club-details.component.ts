import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { Race } from '../../race/race';
import { FormBuilder } from '@angular/forms';
import { UiService } from '../../shared/ui.service';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import * as fromAppReducer from '../../app.reducer';
import { YachtClub } from '../yacht-club';
import { State } from '../yacht-club.reducer';
import { YachtClubService } from '../yacht-club.service';
import { YachtClubResolver } from '../yacht-club-resolver';
import { saveYachtClub } from '../yacht-club.actions';

@Component({
  selector: 'srm-yacht-club-details',
  templateUrl: './yacht-club-details.component.html',
  styleUrls: ['./yacht-club-details.component.css']
})
export class YachtClubDetailsComponent implements OnInit {
  formState$: Observable<FormGroupState<YachtClub>>;
  submittedValue$: Observable<YachtClub | undefined>;
  isLoading: Observable<boolean>;

  constructor( private formBuilder: FormBuilder,
               private raceService: YachtClubService,
               private uiService: UiService,
               private store: Store<State>,
               private router: Router,
               @Inject(YachtClubResolver) private yachtClub: Observable<YachtClub> ) {
    this.formState$ = this.store.pipe( select(state => state.yachtClubManagement.yachtClubDetailsForm ));
    this.submittedValue$ = yachtClub;
  }

  // event handling methods
  ngOnInit() {
    this.subscribeToLoading();
  }

  onCancel() {
    this.router.navigateByUrl( '/yacht-club' );
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      map(formState => saveYachtClub( { yachtClub: formState.value })),
    ).subscribe( this.store );
    this.router.navigateByUrl( '/yacht-club' );

  }

  // public accessors and mutators

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
