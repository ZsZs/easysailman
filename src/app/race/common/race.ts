export interface Race {
  id: string;
  title: string;
  fromDate: Date;
  toDate: Date;
  country: string;
  place: string;
  organizer: string;
  state?: 'planned' | 'completed' | 'cancelled' | null;
}
