import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sailor } from './sailor';
import { FirestoreBaseService } from '../shared/firestore/firestore-base.service';

@Injectable()
export class SailorService extends FirestoreBaseService<Sailor> {
  static readonly path = 'sailors';

  constructor( firestore: AngularFirestore ) {
    super( SailorService.path, firestore );
  }
}
