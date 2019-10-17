import { Registration } from './registration';

export interface Race {
  id: string;
  title: string;
  fromDate: Date;
  toDate: Date;
  country: string;
  place: string;
  organizer: string;
  state?: 'planned' | 'completed' | 'cancelled' | null;
  registrations: Registration[];
}

export const INITIAL_RACE_VALUE: Race = {
  id: undefined,
  title: '',
  fromDate: undefined,
  toDate: undefined,
  country: 'Germany',
  place: '',
  organizer: '',
  state: 'planned',
  registrations: []
};
