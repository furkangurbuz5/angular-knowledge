import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Person } from '../../model/person.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonForm } from '../../model/person-form.model';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  person = input<Person | null>(null);
  isSubmitting = signal(false);
  save = output<Person>();
  cancel = output<void>();
  readonly carOptions = ['Honda', 'Toyota', 'Ford', 'Tesla', 'BMW', 'Mercedes', 'Audi'];
  readonly countryOptions = [
    'England',
    'USA',
    'Germany',
    'France',
    'Japan',
    'Canada',
    'Netherlands',
  ];
  private fb = inject(FormBuilder);
  protected readonly form: FormGroup<PersonForm> = this.fb.group<PersonForm>({
    firstName: this.fb.control(this.person()?.firstName ?? '', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    lastName: this.fb.control(this.person()?.lastName ?? '', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    email: this.fb.control(this.person()?.email ?? '', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    car: this.fb.control(this.person()?.car ?? '', { nonNullable: true }),
    city: this.fb.control(this.person()?.city ?? '', {
      validators: [Validators.minLength(2)],
      nonNullable: true,
    }),
    countryOfOrigin: this.fb.control(this.person()?.countryOfOrigin ?? '', { nonNullable: true }),
    bank: this.fb.control(this.person()?.bank ?? '', { nonNullable: true }),
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      const formControls = this.form.controls;
      //TODO DTO?
      const personData: Person = {
        id: this.person()?.id || 0,
        firstName: formControls.firstName.value,
        lastName: formControls.lastName.value,
        email: formControls.email.value,
        car: formControls.car.value,
        city: formControls.city.value,
        countryOfOrigin: formControls.countryOfOrigin.value,
        bank: formControls.bank.value,
      };
      this.save.emit(personData);
      this.isSubmitting.set(false);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
