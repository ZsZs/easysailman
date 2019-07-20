import { Action } from '@ngrx/store';
import { Race } from './race';
import { SetSubmittedValueAction } from './race-details/race-details.reducer';

export enum RaceActionTypes {
   NewRace = '[RACE] New Race',
   ChangedRace = '[RACE] Changed Race',
   DeletedRace = '[RACE] Deleted Race',
   SaveRace = '[RACE] Save Race',
   FetchRaces = '[RACE] Fetch Available Races'
}

export class NewRaceAction implements Action {
   readonly type = RaceActionTypes.NewRace;
}

export class ChangedRaceAction implements Action {
   readonly type = RaceActionTypes.ChangedRace;

   constructor( public payload: Race ) {}
}

export class DeletedRaceAction implements Action {
   readonly type = RaceActionTypes.DeletedRace;

   constructor( public payload: string ) {}
}

export class SaveRaceAction implements Action {
   readonly type = RaceActionTypes.SaveRace;

   constructor( public payload: Race ) {}
}

export class FetchRacesAction implements Action {
   readonly type = RaceActionTypes.FetchRaces;

   constructor( public payload: Race[] ) {}
}

export type RaceManagementActions = FetchRacesAction | NewRaceAction | ChangedRaceAction | DeletedRaceAction | SaveRaceAction | SetSubmittedValueAction;
