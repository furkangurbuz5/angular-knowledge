import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PersonService } from '../../service/person-service';
import {
  debounceTime,
  distinctUntilChanged,
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
  // --- Proper RxJS Usage (Search) ---
  searchControl = new FormControl('');
  searchResults = signal<Person[]>([]);
  isSearching = signal(false);
  searchQuery = signal('');
  // --- Memory Leak Demo ---
  leakyCounter = signal(0);
  fixedCounter = signal(0);
  private personService = inject(PersonService);
  private destroy$ = new Subject<void>(); // For cleanup
  private leakyIntervalId?: number; // Intentionally NOT an Observable (for demo)
  private fixedInterval$?: Observable<number>;

  ngOnInit(): void {
    // ✅ Proper RxJS: Debounced search
    this.searchControl.valueChanges
      .pipe(
        tap(() => this.isSearching.set(true)),
        debounceTime(300), // Wait 300ms after last keystroke
        distinctUntilChanged(), // Ignore if same as previous
        switchMap((query) => {
          return this.personService
            .searchPersons(query)
            .pipe(tap(() => this.isSearching.set(false)));
        }),
        takeUntil(this.destroy$), // Auto-unsubscribe on destroy
      )
      .subscribe((results) => {
        this.searchResults.set(results);
        this.searchQuery.set(this.searchControl.value || '');
      });

    // ⚠️ Memory Leak Example: setInterval (not RxJS, but demonstrates the concept)
    // Note: Using setInterval instead of Observable.interval to avoid RxJS cleanup
    this.leakyIntervalId = window.setInterval(() => {
      this.leakyCounter.update((c) => c + 1);
    }, 1000);

    // ✅ Fixed Version: RxJS interval with takeUntil
    this.fixedInterval$ = interval(1000).pipe(
      tap(() => this.fixedCounter.update((c) => c + 1)),
      takeUntil(this.destroy$), // Proper cleanup
    );
  }

  ngOnDestroy(): void {
    // Clean up RxJS subscriptions
    this.destroy$.next();
    this.destroy$.complete();

    // ⚠️ The leaky setInterval is NOT cleaned up!
    // This simulates a memory leak (e.g., forgotten subscription)
    if (this.leakyIntervalId) {
      // window.clearInterval(this.leakyIntervalId); // Uncomment to fix
    }
  }

  // Simulate fixing the leak (for demo purposes)
  fixLeak(): void {
    if (this.leakyIntervalId) {
      window.clearInterval(this.leakyIntervalId);
      this.leakyIntervalId = undefined;
    }
  }
}
