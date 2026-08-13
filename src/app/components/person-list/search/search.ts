import { Component, output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  search = output<string>();
  query: WritableSignal<string> = signal('');

  protected onSearch() {
    this.search.emit(this.query());
  }
}
