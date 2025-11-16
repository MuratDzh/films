import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-search-input',
  imports: [ReactiveFormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  searchWord = new FormControl("")

  @Output()
  onSearchWord = new EventEmitter<string>()

  constructor(){
    this.searchWord.valueChanges.pipe(
      debounceTime(300),
      tap(v => this.onSearchWord.emit(v as string)),
      takeUntilDestroyed()
    ).subscribe()
  }

}
