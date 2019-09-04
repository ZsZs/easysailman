import { FirestoreBaseEntityInterface } from '../shared/firestore/firestore-base-entity.interface';

export interface BoatClass extends FirestoreBaseEntityInterface {
  id: string;
  name: string;
  yardstick: number;
}
