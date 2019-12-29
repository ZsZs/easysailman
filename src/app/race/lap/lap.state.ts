import { Lap } from '../domain/lap';
import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';
import { createSelector } from '@ngrx/store';

export const { initialState, facade: LapFacadeBase, selectors } = buildState( Lap );

export const {
  selectAll: allLaps,
  selectCurrentEntity: currentLap,
  selectTotal: numberOfLaps
} = selectors;

// A "stub" reducer is required to support AOT
export function lapReducer( state = initialState): IEntityState<Lap> {
  return state;
}

export const getIsLoaded = ( raceId: string ) => createSelector( allLaps, ( laps ) => {
  return laps && laps.filter( lap => lap.raceId === raceId ).length > 0;
});
