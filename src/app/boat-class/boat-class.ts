import { BaseEntityInterface } from '../shared/firestore/base-entity.interface';

export interface BoatClass extends BaseEntityInterface {
  id: string;
  name: string;
  yardstick: number;
}
