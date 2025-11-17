import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilmsService } from '../../data/services/films';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { IFilmFull } from '../../data/interfaces/film.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-film',
  imports: [CommonModule],
  templateUrl: './film.html',
  styleUrl: './film.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Film {

  filmsService = inject(FilmsService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  film$: Observable<IFilmFull>|null

  history: History = history

  constructor(){
    this.film$ = this.route.params.pipe(
      switchMap(({id}) => this.filmsService.getFilmById(id))
    )
  }

  getBack(){
    if(this.filmsService.isSearched){
      this.router.navigateByUrl('/searched-films')
    } else {
      this.router.navigateByUrl('/films')
    }
  }
}
