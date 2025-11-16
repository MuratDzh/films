import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilmsService } from '../../data/services/films';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { IFilm, IFilmFull } from '../../data/interfaces/film.interface';
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

  film$: Observable<IFilmFull>|null

  constructor(){
    this.film$ = this.route.params.pipe(
      tap(({id})=>console.log("ID", id)),
      switchMap(({id}) => this.filmsService.getFilmById(id))
    )
  }
}
