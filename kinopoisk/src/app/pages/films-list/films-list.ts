import { Component, inject } from '@angular/core';
import { FilterLayout } from '../../components/filter-layout/filter-layout';
import { CommonModule } from '@angular/common';
import { IFilm, IFilterFormOpt } from '../../data/interfaces/film.interface';
import { map, Observable } from 'rxjs';
import { FilmsService } from '../../data/services/films';
import { Spinner } from '../../components/ui/spiner/spinner';

@Component({
  selector: 'app-films-list',
  imports: [FilterLayout, CommonModule, Spinner],
  templateUrl: './films-list.html',
  styleUrl: './films-list.scss'
})
export class FilmsList {

  public filmsService = inject(FilmsService)

  filterFormOptions: IFilterFormOpt|null = null 

  filteredFilms$: Observable<IFilm[]>|null = null

  constructor(){
    this.onFilteredOpt()
  }

  onFilteredOpt(val?: IFilterFormOpt, page?: number){
    if(val){
      this.filterFormOptions = val
    }

    const value = val ?? this.filterFormOptions
    console.log("MMM", value, page);
    
    this.filteredFilms$ = this.filmsService.getFilms(value, page)
    .pipe(map(v=>v.items))
  }

}
