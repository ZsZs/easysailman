import { createAction, props } from '@ngrx/store';
import { RouterUri } from '../router/router-uri';

/*
export let allEntitiesRequested;
export let allEntitiesLoaded;
export let entityRequested;
export let entityLoaded;
export let editEntity;
export let newEntity;
export let deleteEntity;
export let entityDeleted;
export let addEntity;
export let addOrUpdateEntity;
export let updateEntity;
export let entitySaved;
export let setSelectedEntities;
export let entityAPIError;

function createRaceBaseActions<T>( featureName: string ) {
const featureName = 'BASE_ENTITY';

export const allEntitiesRequested = createAction(`[${featureName}] All entities requested` );
export const allEntitiesLoaded = createAction(`[${featureName}] All entities loaded`, props<{ entities: T[], redirectTo?: RouterUri}>() );
export const entityRequested = createAction(`[${featureName}] Entity requested`, props<{ entityId: string }>() );
export const entityLoaded = createAction(`[${featureName}] Entity loaded`, props<{ entity: T, redirectTo?: RouterUri }>() );
export const editEntity = createAction(`[${featureName}] Edit entity`, props<{ entity: T }>() );
export const newEntity = createAction(`[${featureName}] New entity`, props<{ entity: T }>() );
export const deleteEntity = createAction(`[${featureName}] Delete entity`, props<{ entityId: string, redirectTo?: RouterUri }>() );
export const entityDeleted = createAction(`[${featureName}] Entity deleted`, props<{ redirectTo?: RouterUri }>());
export const addEntity = createAction(`[${featureName}] Add entity`, props<{ entity: T, redirectTo?: RouterUri }>() );
export const addOrUpdateEntity = createAction(`[${featureName}] Add or update entity`, props<{ entity: T, redirectTo?: RouterUri }>() );
export const updateEntity = createAction(`[${featureName}] Update entity`, props<{ entity: T, redirectTo?: RouterUri }>() );
export const entitySaved = createAction(`[${featureName}] Entity saved`, props<{ entity: T, redirectTo?: RouterUri }>() );
export const setSelectedEntities = createAction(`[${featureName}] Entities selected`, props<{ entities: T[] }>() );
export const entityAPIError = createAction(`[${featureName}] Entity API error`, props<{ error: string, redirectTo?: RouterUri }>() );
*/

