import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize, take, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Collection } from '../../model/collection.model';
import { CreateCollectionRequest } from '../../dto/collection-request.dto';
import { CollectionService } from '../../service/collection-service';

@Component({
  selector: 'app-collections',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './collections.html',
  styleUrl: './collections.css',
})
export class Collections {
  protected readonly collections = signal<Collection[]>([]);
  protected collection = '';
  private readonly collectionService = inject(CollectionService);

  ngOnInit() {
    this.fetchCollections();
  }

  protected addCollection() {
    if (!this.collection) {
      return;
    }

    const collection: CreateCollectionRequest = {
      name: this.collection,
    };

    this.collectionService
      .addCollection(collection)
      .pipe(
        take(1),
        finalize(() => {
          this.fetchCollections();
          this.collection = '';
        }),
      )
      .subscribe();
  }

  private fetchCollections() {
    this.collectionService
      .getAllCollections()
      .pipe(
        take(1),
        tap((collections) => {
          this.collections.set(collections);
        }),
      )
      .subscribe();
  }
}
