import { inject, Injectable } from '@angular/core';
import { PersonClient } from '../client/person-client';
import { map, Observable, of, take, tap } from 'rxjs';
import { Person } from '../model/person.model';
import { mapResponseToPerson, PersonResponse } from '../dto/person-response.dto';
import { CreatePersonRequest } from '../dto/person-request.dto';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly personClient: PersonClient = inject(PersonClient);
  private readonly personCache: Map<string, Person> = new Map<string, Person>();

  getAllPersons(): Observable<Person[]> {
    return this.personClient.getAllPersons().pipe(
      take(1),
      map((personResponse: PersonResponse[]): Person[] => {
        return personResponse.map(mapResponseToPerson);
      }),
    );
  }

  getPersonById(id: string) {
    if (this.personCache.get(id)) {
      return of(this.personCache.get(id)!);
    }
    return this.personClient.getPersonById(id).pipe(
      take(1),
      map((personResponse: PersonResponse): Person => {
        return mapResponseToPerson(personResponse);
      }),
      tap((person) => {
        this.personCache.set(person.id.toString(), person);
      }),
    );
  }

  getPersonByFirstName(name: string) {
    return this.personClient.getPersonByName(name).pipe(
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

  searchPersons(query: string | null): Observable<Person[]> {
    return of([]);
  }
}
