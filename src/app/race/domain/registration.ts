import { BaseEntityInterface } from '../../shared/firestore/base-entity.interface';

export interface Registration extends BaseEntityInterface {
  id: string;
  raceId: string;
  sailNumber: string;
  boatName: string;
  boatType: string;
  skipper: string;
}

export const INITIAL_REGISTRATION_VALUE: Registration = {
  id: undefined,
  raceId: undefined,
  sailNumber: ``,
  boatName: 'Cheerio',
  boatType: 'Flying Dutchman',
  skipper: 'Zsolt Zsuffa'
};
