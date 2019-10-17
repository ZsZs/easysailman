import { Injectable } from '@angular/core';
import { FirestoreBaseService } from '../../shared/firestore/firestore-base.service';
import { Registration } from '../domain/registration';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';

@Injectable()
export class RegistrationService extends FirestoreBaseService<Registration> {
  static readonly racesPath = 'races';
  static readonly registrationsPath = 'registrations';

  constructor( firestore: AngularFirestore ) {
    super( RegistrationService.racesPath, firestore );
  }

  addRegistration( raceId: string, registration: Registration ): Observable<Registration> {
    this.updateCollectionReferenceToRegistrations( raceId );
    return super.add( registration );
  }

  deleteRegistration( raceId: string, registrationId: string ) {
    this.updateCollectionReferenceToRegistrations( raceId );
    super.delete( registrationId );
  }

  findAllRegistrations( raceId: string ): Observable<Registration[]> {
    this.updateCollectionReferenceToRegistrations( raceId );
    return super.findAll();
  }

  findRegisrationById( raceId: string, registrationId: string ): Observable<Registration> {
    this.updateCollectionReferenceToRegistrations( raceId );
    return super.findById( registrationId );
  }

  updateRegistration( raceId: string, registration: Registration ): Observable<Registration> {
    this.updateCollectionReferenceToRegistrations( raceId );
    return super.update( registration );
  }

  // protected, private helper methods
  updateCollectionReferenceToRegistrations( raceId: string ) {
    this.collection = this.firestore.collection( RegistrationService.racesPath ).doc( raceId ).collection<Registration>( RegistrationService.registrationsPath );
  }
}
