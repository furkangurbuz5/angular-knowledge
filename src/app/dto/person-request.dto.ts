export interface CreatePersonRequest {
  firstName: string;
  lastName: string;
  email: string;
  car: string;
  city: string;
  countryOfOrigin: string;
  bank: string;
}

export interface UpdatePersonRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  car?: string;
  city?: string;
  countryOfOrigin?: string;
  bank?: string;
}
