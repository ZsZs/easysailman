import { BaseEntityInterface } from '../../shared/firestore/base-entity.interface';

export interface Participant extends BaseEntityInterface {
  raceId: string;
  lapIndex: number;
  sailNumber: string;
  boatName: string;
  boatType: string;
  skipper: string;
}
