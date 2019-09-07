import { createAction, props } from '@ngrx/store';
import { BoatClass } from './boat-class';
import { RouterUri } from '../shared/router/router-uri';

export const allBoatClassesRequested = createAction('[BOAT-CLASS] All boat classes requested' );
export const allBoatClassesLoaded = createAction('[BOAT-CLASS] All boat classes loaded', props<{ boatClasses: BoatClass[], redirectTo?: RouterUri}>() );
export const boatClassRequested = createAction('[BOAT-CLASS] Boat class requested', props<{ boatClassId: string }>() );
export const boatClassLoaded = createAction('[BOAT-CLASS] Boat class loaded', props<{ boatClass: BoatClass, redirectTo?: RouterUri }>() );
export const editBoatClass = createAction('[BOAT-CLASS] Edit boat class', props<{ boatClass: BoatClass }>() );
export const newBoatClass = createAction('[BOAT-CLASS] New boat class', props<{ boatClass: BoatClass }>() );
export const deleteBoatClass = createAction('[BOAT-CLASS] Delete boat class', props<{ boatClassId: string, redirectTo?: RouterUri }>() );
export const boatClassDeleted = createAction('[BOAT-CLASS] Boat class deleted', props<{ redirectTo?: RouterUri }>());
export const addBoatClass = createAction('[BOAT-CLASS] Add boat class', props<{ boatClass: BoatClass, redirectTo?: RouterUri }>() );
export const addOrUpdateBoatClass = createAction('[BOAT-CLASS] Add or update boat class', props<{ boatClass: BoatClass, redirectTo?: RouterUri }>() );
export const updateBoatClass = createAction('[BOAT-CLASS] Update boat class', props<{ boatClass: BoatClass, redirectTo?: RouterUri }>() );
export const boatClassSaved = createAction('[BOAT-CLASS] Boat class saved', props<{ boatClass: BoatClass, redirectTo?: RouterUri }>() );
export const setSelectedBoatClasses = createAction('[BOAT-CLASS] Boat classes selected', props<{ boatClasses: BoatClass[] }>() );
export const boatClassAPIError = createAction('[BOAT-CLASS] Boat class API error', props<{ error: string, redirectTo?: RouterUri }>() );
