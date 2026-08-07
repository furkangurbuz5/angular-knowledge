import { FormControl } from '@angular/forms';

export interface PersonForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  car: FormControl<string>;
  city: FormControl<string>;
  countryOfOrigin: FormControl<string>;
  bank: FormControl<string>;
}
