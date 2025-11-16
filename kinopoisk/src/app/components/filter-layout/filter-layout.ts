import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFilterFormOpt, IFilterOpt } from '../../data/interfaces/film.interface';
import { switchMap, tap } from 'rxjs';
import { FilmsService } from '../../data/services/films';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-layout',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-layout.html',
  styleUrl: './filter-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterLayout implements OnInit {
 
  fb = inject(FormBuilder)
  filmsService = inject(FilmsService)

  genres = [
    {id: 1, genre: 'триллер'},
    {id: 2, genre: 'драма'},
    {id: 5, genre: 'детектив'},
    {id: 6, genre: 'фантастика'},
    {id: 7, genre: 'приключения'},
    {id: 11, genre: 'боевик'},
    {id: 12, genre: 'фэнтези'},
    {id: 13, genre: 'комедия'}, 
    {id: 18, genre: 'мультфильм'},
    {id: 19, genre: 'семейный'},
    {id: 24, genre: 'аниме'}
  ]
  countries = [
    [1, "США"],
    [3, "Франция"],
    [5, "Великобритания"],
    [33, "СССР"],
    [34, "Россия"],
    [9, "Германия"],
    [49, "Южная Корея"],
  ]
  years: number[] = []
  ratings: number[] = []
  orders = [["RATING", "По рейтингу"], ["NUM_VOTE", "По отзывам"], ["YEAR", "По годам"]]
  types = [["FILM", "Фильмы"], ["TV_SHOW", "ТВ шоу"], ["TV_SERIES", "ТВ сериалы"], ["MINI_SERIES", "Мини сериалы"], ["ALL", "Все типы"],]

  form = this.fb.nonNullable.group<IFilterFormOpt>({
    countries: "",
    genres: "",
    keyword: "",
    type: "ALL",
    order: "RATING",
    ratingFrom: "1",
    ratingTo: "10",
    yearFrom: "",
    yearTo: "", 
  })

  @Output()
  formValue = new EventEmitter<IFilterFormOpt>()
    
  constructor() {
    this.form.getRawValue()
    
    this.form.valueChanges.pipe(
      tap(console.log),
      tap(()=>this.onFormValue()),
      takeUntilDestroyed()
    )
    .subscribe()
  }

  ngOnInit(): void {
    for(let i = (new Date).getFullYear(); i>1990; i--){
      this.years.push(i)
    }

    for(let i = 10; i>0; i--){
      this.ratings.push(i)
    }
    
  }

  onFormValue(){
    console.log(this.form.value);
    
    this.formValue.emit(this.form.value as IFilterFormOpt)
  }

  onReset(){
    this.form.reset()
  }

}
