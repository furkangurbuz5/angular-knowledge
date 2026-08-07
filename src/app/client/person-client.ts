import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonResponse } from '../dto/person-response.dto';
import { Observable } from 'rxjs';
import { CreatePersonRequest } from '../dto/person-request.dto';

@Injectable({
  providedIn: 'root',
})
export class PersonClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getAllPersons(): Observable<PersonResponse[]> {
    return this.httpClient.get<PersonResponse[]>('http://localhost:8080/api/v1/persons');
  }

  getPersonById(id: string): Observable<PersonResponse> {
    return this.httpClient.get<PersonResponse>(`http://localhost:8080/api/v1/persons/${id}`);
  }

  addPerson(person: CreatePersonRequest): Observable<PersonResponse> {
    return this.httpClient.post<PersonResponse>('http://localhost:8080/api/v1/persons', person);
  }
}
