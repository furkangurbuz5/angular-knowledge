import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PersonService } from '../../service/person-service';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  interval,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../model/person.model';

@Component({
  selector: 'app-rxjs-demo',
  imports: [ReactiveFormsModule],
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css',
})
export class RxjsDemo implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  searchResults = signal<Person[]>([]);
  isSearching = signal(false);
  searchQuery = signal('');

  leakyCounter = signal(0);
  fixedCounter = signal(0);
  private personService = inject(PersonService);
  private destroy$ = new Subject<void>();
  private leakyIntervalId?: number;
  private fixedInterval$?: Observable<number>;

  ngOnInit(): void {
    this.startObservingMouseMovement();
    this.searchControl.valueChanges
      .pipe(
        tap(() => this.isSearching.set(true)),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          return this.personService
            .getPersonsByFirstName(query!)
            .pipe(tap(() => this.isSearching.set(false)));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((results) => {
        this.searchResults.set(results);
        this.searchQuery.set(this.searchControl.value || '');
      });

    // this.leakyIntervalId = window.setInterval(() => {
    //   this.leakyCounter.update((c) => c + 1);
    // }, 1000);

    this.fixedInterval$ = interval(1000).pipe(
      tap(() => this.fixedCounter.update((c) => c + 1)),
      takeUntil(this.destroy$),
    );

    this.fixedInterval$.subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.leakyIntervalId) {
      // window.clearInterval(this.leakyIntervalId);
    }
  }

  fixLeak(): void {
    if (this.leakyIntervalId) {
      window.clearInterval(this.leakyIntervalId);
      this.leakyIntervalId = undefined;
    }
  }

  startObservingMouseMovement(): void {
    console.log('startObservingMouseMovement');
    const canvas = document.getElementById('demo-container') as HTMLDivElement | null;

    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const mouseMove$ = fromEvent<MouseEvent>(canvas, 'mousemove');

    mouseMove$.subscribe((event: MouseEvent) => {
      console.log(`Mouse position: X: ${event.clientX}, Y: ${event.clientY}`);
    });
  }
}
