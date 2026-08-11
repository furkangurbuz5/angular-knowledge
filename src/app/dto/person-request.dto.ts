export interface CreatePersonRequest {
  first_name: string;
  last_name: string;
  email: string;
  car: string;
  city: string;
  country_of_origin: string;
  bank: string;
}

export interface UpdatePersonRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  car?: string;
  city?: string;
  country_of_origin?: string;
  bank?: string;
}
