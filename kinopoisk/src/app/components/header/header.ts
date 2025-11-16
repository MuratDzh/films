import { Component, HostListener, inject, signal, ViewChild } from '@angular/core';
import { SearchInput } from '../ui/search-input/search-input';
import { FilmsService } from '../../data/services/films';
import { map, Observable } from 'rxjs';
import { IFilm, ISearchFilmsRes } from '../../data/interfaces/film.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SearchInput, CommonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  filmsService = inject(FilmsService)

  @ViewChild("input", {read: SearchInput})
  input!:SearchInput

  searchedFilms$: Observable<ISearchFilmsRes>|null = null
  isHidden = signal(false)

  @HostListener("window:click", ['$event'])
  onWinClick(e: PointerEvent){

    
    if(((e.target as HTMLElement).offsetParent as HTMLDivElement).className == "search-wrapper"){

      this.isHidden.set(false)
      
    } else {
      this.isHidden.set(true)
    }

  }

  onSearchInput(e: string){

    if(e.length > 2){

      this.searchedFilms$ = this.filmsService.searchFilms(e)

    } else {

      this.searchedFilms$ = null

    }
  }

}
