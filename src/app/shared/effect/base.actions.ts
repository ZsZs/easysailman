import { createAction, props } from '@ngrx/store';
import { RouterUri } from '../router/router-uri';

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

const featureName = 'BASE_ENTITY';

// tslint:disable-next-line:no-shadowed-variable
function createRaceBaseActions<T>( featureName: string ) {
  allEntitiesRequested = createAction(`[${featureName}] All entities requested` );
  allEntitiesLoaded = createAction(`[${featureName}] All entities loaded`, props<{ entities: T[], redirectTo?: RouterUri}>() );
  entityRequested = createAction(`[${featureName}] Entity requested`, props<{ entityId: string }>() );
  entityLoaded = createAction(`[${featureName}] Entity loaded`, props<{ entity: T, redirectTo?: RouterUri }>() );
  editEntity = createAction(`[${featureName}] Edit entity`, props<{ entity: T }>() );
  newEntity = createAction(`[${featureName}] New entity`, props<{ entity: T }>() );
  deleteEntity = createAction(`[${featureName}] Delete entity`, props<{ entityId: string, redirectTo?: RouterUri }>() );
  entityDeleted = createAction(`[${featureName}] Entity deleted`, props<{ redirectTo?: RouterUri }>());
  addEntity = createAction(`[${featureName}] Add entity`, props<{ entity: T, redirectTo?: RouterUri }>() );
  addOrUpdateEntity = createAction(`[${featureName}] Add or update entity`, props<{ entity: T, redirectTo?: RouterUri }>() );
  updateEntity = createAction(`[${featureName}] Update entity`, props<{ entity: T, redirectTo?: RouterUri }>() );
  entitySaved = createAction(`[${featureName}] Entity saved`, props<{ entity: T, redirectTo?: RouterUri }>() );
  setSelectedEntities = createAction(`[${featureName}] Entities selected`, props<{ entities: T[] }>() );
  entityAPIError = createAction(`[${featureName}] Entity API error`, props<{ error: string, redirectTo?: RouterUri }>() );
}



