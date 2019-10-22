import { Lap } from './lap';
import { buildState, IEntityState } from '@briebug/ngrx-auto-entity';

export const { initialState, facade: LapFacadeBase } = buildState(Lap);

// A "stub" reducer is required to support AOT
export function lapReducer( state = initialState): IEntityState<Lap> {
  return state;
}
