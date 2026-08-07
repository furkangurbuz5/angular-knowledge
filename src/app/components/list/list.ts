import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Table } from './table/table';
import { Person } from '../../model/person.model';
import { PersonService } from '../../service/person-service';
import { combineLatest, debounceTime, finalize, map, Subject, take, takeUntil, tap } from 'rxjs';
import { Search } from './search/search';

@Component({
  selector: 'app-list',
  imports: [Table, Search],
  templateUrl: './list.html',
  styleUrl: './list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List implements OnInit, OnDestroy {
  protected readonly persons: WritableSignal<Person[]> = signal<Person[]>([]);
  protected readonly filteredPersons: WritableSignal<Person[]> = signal<Person[]>(this.persons());
  protected readonly isLoading: WritableSignal<boolean> = signal<boolean>(true);
  protected readonly error: WritableSignal<string | null> = signal<string | null>(null);

  protected searchQuery$: Subject<string> = new Subject<string>();
  private destroy$ = new Subject<void>();

  private readonly personService: PersonService = inject(PersonService);

  ngOnInit() {
    this.fetchPersons();
    this.openPersonsFilter();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  protected onSearch(search: string) {
    this.searchQuery$.next(search);
  }

  private fetchPersons(): void {
    this.personService
      .getAllPersons()
      .pipe(
        take(1),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe((persons: Person[]) => {
        this.persons.set(persons);
        this.filteredPersons.set(persons);
      });
  }

  private openPersonsFilter(): void {
    combineLatest([this.personService.getAllPersons(), this.searchQuery$])
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$),
        map(([persons, query]) =>
          persons.filter(
            (person) =>
              person.firstName.toLowerCase().includes(query.toLowerCase()) ||
              person.email.toLowerCase().includes(query.toLowerCase()),
          ),
        ),
        tap((persons: Person[]) => {
          this.filteredPersons.set(persons);
        }),
      )
      .subscribe({
        error: () => this.error.set('Failed to load persons data.'),
      });
  }
}
