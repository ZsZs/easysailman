import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Race } from './domain/race';
import { FirestoreBaseService } from '../shared/firestore/firestore-base.service';

@Injectable()
export class RaceService extends FirestoreBaseService<Race> {
  static readonly path = 'races';

  constructor( firestore: AngularFirestore ) {
    super( RaceService.path, firestore );
  }
}
