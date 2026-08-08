import { inject, Injectable } from '@angular/core';
import { PersonClient } from '../client/person-client';
import { map, Observable, take } from 'rxjs';
import { Person } from '../model/person.model';
import { mapResponseToPerson, PersonResponse } from '../dto/person-response.dto';
import { CreatePersonRequest } from '../dto/person-request.dto';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly personClient: PersonClient = inject(PersonClient);

  getAllPersons(): Observable<Person[]> {
    return this.personClient.getAllPersons().pipe(
      take(1),
      map((personResponse: PersonResponse[]): Person[] => {
        return personResponse.map(mapResponseToPerson);
      }),
    );
  }

  getPersonById(id: string) {
    return this.personClient.getPersonById(id).pipe(
      take(1),
      map((personResponse: PersonResponse): Person => {
        return mapResponseToPerson(personResponse);
      }),
    );
  }

  getPersonsByFirstName(name: string): Observable<Person[]> {
    return this.personClient.getPersonsByName(name).pipe(
      map((personResponse: PersonResponse[]): Person[] => {
        return personResponse.map(mapResponseToPerson);
      }),
    );
  }

  addPerson(person: CreatePersonRequest) {
    return this.personClient.addPerson(person).pipe(
      take(1),
      map((personResponse) => {
        return mapResponseToPerson(personResponse);
      }),
    );
  }

  deletePersonById(id: number) {
    return this.personClient.deletePersonById(id).pipe(
      take(1),
      map((personResponse) => {
        return mapResponseToPerson(personResponse);
      }),
    );
  }
}
