import { Component, HostListener, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { SearchInput } from '../ui/search-input/search-input';
import { FilmsService } from '../../data/services/films';
import { map, Observable, of, Subscription } from 'rxjs';
import { IFilm, ISearchFilmsRes } from '../../data/interfaces/film.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SearchInput, CommonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnDestroy {

  filmsService = inject(FilmsService)

  @ViewChild("input", {read: SearchInput})
  input!:SearchInput

  searchedFilms$: Observable<ISearchFilmsRes|null> = this.filmsService.searchedFilms
  subscriptions!: Subscription

  isHidden = signal(false)

  @HostListener("window:click", ['$event'])
  onWinClick(e: PointerEvent){

    
    if(((e.target as HTMLElement).offsetParent as HTMLDivElement)?.className == "search-wrapper"){

      this.isHidden.set(false)
      
    } else {
      this.isHidden.set(true)
    }

  }


  onSearchInput(e: string){

    if(e.length < 3){
      
      this.searchedFilms$ = of(null)

      if(!this.filmsService.isSearched){
        console.log("yyy");
        this.filmsService.searchedFilmsSub.next(null)
      }
    }

    if(e.length > 2){

      this.subscriptions = this.filmsService.searchFilms(e).subscribe()
      this.searchedFilms$ = this.filmsService.searchedFilms
    } 
  }

  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe()
    }
  }

}
