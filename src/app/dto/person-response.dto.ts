import {Person} from '../model/person.model';

export interface PersonResponse {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  car: string,
  city: string,
  countryOfOrigin: string,
  bank: string
}

export function mapResponseToPerson(personResponse: PersonResponse): Person {
  return {
    bank: personResponse.bank,
    car: personResponse.car,
    city: personResponse.city,
    countryOfOrigin: personResponse.countryOfOrigin,
    email: personResponse.email,
    firstName: personResponse.first_name,
    id: personResponse.id,
    lastName: personResponse.last_name
  }
}
