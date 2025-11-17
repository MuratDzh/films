import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal, ViewContainerRef } from '@angular/core';
import { Paginations } from '../../components/ui/paginations/paginations';
import { map, Observable, Subscription } from 'rxjs';
import { IFilm, ISearchFilmsRes } from '../../data/interfaces/film.interface';
import { FilmsService } from '../../data/services/films';
import { Router } from '@angular/router';
import { Modal } from '../../components/ui/modal/modal';
import { ModalService } from '../../data/services/modal.service';

@Component({
  selector: 'app-search-result',
  imports: [CommonModule, Paginations],
  templateUrl: './search-result.html',
  styleUrl: './search-result.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
 
})
export class SearchResult implements OnDestroy {

  filmsService = inject(FilmsService)
  modalService = inject(ModalService)
  router = inject(Router)
  viewContainer = inject(ViewContainerRef)

  subscriptions!: Subscription

  searchedFilms$: Observable<ISearchFilmsRes|null> = this.filmsService.searchedFilms
  pages$: Observable<number|undefined> = this.searchedFilms$.pipe(map(v => v?.pagesCount))
  pages = signal(1)
  currentPage = signal<number>(1)

  constructor(){
    if(!this.filmsService.isSearched){
      this.router.navigateByUrl("")
    }

     if(!this.filmsService.searchedFilmsSub.value){
    } else {
      this.searchedFilms$ = this.filmsService.searchedFilms
      this.currentPage = this.filmsService.currentPage
      this.pages = this.filmsService.pages
    }
  }

  onCurrentPage(word: string, page: number){
    this.currentPage.set(page)
    this.subscriptions = this.filmsService.searchFilms(word, page).subscribe()
    
  }

  getFilmDescription(film: IFilm){
    const modal = this.modalService.createModal(Modal)
    modal?.setInput('film', film)
    
  }

  ngOnDestroy(): void {
    if(this.subscriptions){

      this.subscriptions.unsubscribe()
    }
  }

}
