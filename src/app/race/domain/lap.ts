import { Participant } from './participant';
import { Key } from '@briebug/ngrx-auto-entity';

export class Lap {
  @Key index: number;
  raceId: string;
  startTime: Date;
  finishTime: Date;
  participants: Participant[];
}
