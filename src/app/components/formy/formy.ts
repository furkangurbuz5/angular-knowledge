import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UserAction } from '../../types/user-action.type';
import { UserActionCard } from './user-action-card/user-action-card';

@Component({
  selector: 'app-formy',
  imports: [ReactiveFormsModule, UserActionCard],
  templateUrl: './formy.html',
  styleUrl: './formy.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Formy {
  protected inputs = signal<{ name: string }[]>([]);
  private readonly fb = inject(FormBuilder);
  protected formy = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    actions: this.fb.nonNullable.array<UserAction>([]),
  });
  private readonly destroy$: Subject<void> = new Subject();

  get actionArray(): UserAction[] {
    return this.formy.controls.actions.value;
  }

  get name(): string {
    return this.formy.controls.name.value;
  }

  get isFormValid(): boolean {
    return this.formy.valid;
  }

  get isActionArrayComplete(): boolean {
    return this.actionArray.length > 1;
  }

  ngOnInit() {
    this.openFormSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onSubmit() {
    if (!this.isFormValid) {
      return;
    }
    const add = {
      name: this.name,
    };
    this.inputs.update((current) => [...current, add]);
    this.formy.patchValue({ name: '' });
  }

  protected onAddAction() {
    const action: UserAction = {
      dateCreated: new Date(),
      description: 'This is a test action',
      id: Math.ceil(Math.random() * 10),
      name: this.name,
    };
    this.actionArray.push(action);
  }

  private openFormSubscription() {
    this.formy.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((snapshot) => {
      console.log(snapshot);
    });
  }
}
