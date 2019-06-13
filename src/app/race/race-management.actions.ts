import { Action } from '@ngrx/store';
import { Race } from './race';
import { SetSubmittedValueAction } from './race-details/race-details.reducer';

export const NEW_RACE = '[RACE] New Race';
export const CHANGED_RACE = '[RACE] Changed Race';
export const DELETED_RACE = '[RACE] Deleted Race'
export const FETCH_RACES = '[RACE] Fetch Available Races';

export class NewRaceAction implements Action {
   readonly type = NEW_RACE;
}

export class FetchRacesAction implements Action {
   readonly type = FETCH_RACES;

   constructor( public payload: Race[] ) {}
}

export class ChangedRaceAction implements Action {
   readonly type = CHANGED_RACE;

   constructor( public payload: Race ) {}
}

export class DeletedRaceAction implements Action {
   readonly type = DELETED_RACE;

   constructor( public payload: string ) {}
}

export type RaceManagementActions = FetchRacesAction | NewRaceAction | ChangedRaceAction | DeletedRaceAction | SetSubmittedValueAction;
