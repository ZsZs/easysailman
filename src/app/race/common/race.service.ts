import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Race } from './race';
import { FirestoreBaseService } from '../../shared/firestore/firestore-base.service';

@Injectable()
export class RaceService extends FirestoreBaseService<Race> {
  static readonly path = 'races';

  constructor( firestore: AngularFirestore ) {
    super( RaceService.path, firestore );
  }
}
