import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreBaseService } from '../shared/firestore/firestore-base.service';
import { BoatClass } from './boat-class';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class BoatClassService extends FirestoreBaseService<BoatClass> {
  static readonly path = 'boat-classes';

  constructor( firestore: AngularFirestore ) {
    super( BoatClassService.path, firestore );
  }
}
