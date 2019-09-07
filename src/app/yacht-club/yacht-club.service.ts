import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { YachtClub } from './yacht-club';
import { FirestoreBaseService } from '../shared/firestore/firestore-base.service';

@Injectable()
export class YachtClubService extends FirestoreBaseService<YachtClub> {
  static readonly path = 'yacht-clubs';

  constructor( private db: AngularFirestore ) {
    super( YachtClubService.path, db );
  }
}
