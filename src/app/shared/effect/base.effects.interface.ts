export interface RaceBaseEffectInterface<T> {
  apiCallFinished();
  apiCallError();
  addEntity( entity: T );
  deleteEntity( entityId: string );
  loadEntity( entityId: string );
  loadAllEntities();
}
