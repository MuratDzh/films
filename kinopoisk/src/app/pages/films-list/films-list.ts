import { Component, inject, ViewContainerRef } from '@angular/core';
import { FilterLayout } from '../../components/filter-layout/filter-layout';
import { CommonModule } from '@angular/common';
import { IFilm, IFilterFormOpt } from '../../data/interfaces/film.interface';
import { map, Observable, tap } from 'rxjs';
import { FilmsService } from '../../data/services/films';
import { Spinner } from '../../components/ui/spiner/spinner';
import { Paginations } from '../../components/ui/paginations/paginations';
import { Modal } from '../../components/ui/modal/modal';
import { ModalService } from '../../data/services/modal.service';

@Component({
  selector: 'app-films-list',
  imports: [FilterLayout, CommonModule, Spinner, Paginations],
  templateUrl: './films-list.html',
  styleUrl: './films-list.scss'
})
export class FilmsList {

  public filmsService = inject(FilmsService)
  public modalServise = inject(ModalService)
  viewContainer = inject(ViewContainerRef)

  filterFormOptions: IFilterFormOpt|null = null 

  filteredFilms$: Observable<IFilm[]>|null = null
  pages: number|null = null
  currentPage: number = 1

  constructor(){
    if(!this.filmsService.filteredFilmsSub.value){
      this.onFilteredOpt()
    } else {
      this.filteredFilms$ = this.filmsService.filteredFilmsSub.asObservable() as Observable<IFilm[]>
      this.currentPage = this.filmsService.currentFilteredFilmsPage()
      this.pages = this.filmsService.pages()
    }
  }

  onFilteredOpt(val?: IFilterFormOpt, page?: number){
    if(val){
      this.filterFormOptions = val
    }

    const value = val ?? this.filterFormOptions
    
    this.filteredFilms$ = this.filmsService.getFilms(value, page)
    .pipe(
      tap(v => this.pages = v.totalPages),
      map(v => v.items))
  }

  onCurrentPage(page: number){
    this.currentPage = page
    this.filteredFilms$ = this.filmsService.getFilms(this.filterFormOptions, page)
    .pipe(
      tap(v => this.pages = v.totalPages),
      map(v => v.items))
  }

  getFilmDescription(film: IFilm){
      const modal = this.modalServise.createModal(Modal)
      modal?.setInput('film', film)
    }

}
