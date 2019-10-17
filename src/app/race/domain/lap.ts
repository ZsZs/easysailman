import { Participant } from './participant';

export interface Lap {
  index: number;
  startTime: Date;
  finishTime: Date;
  participants: Participant[];
}
