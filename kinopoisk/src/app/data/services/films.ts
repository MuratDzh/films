import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IFilm, IFilmFull, IFilmsRes, IFilterFormOpt, IFilterOpt, ISearchFilmsRes } from '../interfaces/film.interface';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private http = inject(HttpClient)

  private url = "https://kinopoiskapiunofficial.tech/api";

  getFilms(opt: IFilterFormOpt|null = null, page: number = 1): Observable<IFilmsRes>{
    return this.http.get<IFilmsRes>(`${this.url}/v2.2/films`, {
      params: {
        countries: opt?.countries ?? [],
        genres: opt?.genres ?? [],
        type: opt?.type ?? "",
        order: opt?.order ?? "",
        ratingFrom: opt?.ratingFrom ?? "",
        ratingTo: opt?.ratingTo ?? "",
        yearFrom: opt?.yearFrom ?? "",
        yearTo: opt?.yearTo ?? "",
        keyword: opt?.keyword ?? "",
        page
      }
    })
  }

  getFilmById(id: number): Observable<IFilmFull>{
    return this.http.get<IFilmFull>(`${this.url}/v2.2/films/${id}`)
  }

  getFilters(): Observable<unknown>{
    return this.http.get<unknown>(`${this.url}/v2.2/films/filters`)
  }

  searchFilms(keyword: string, page: number = 1): Observable<ISearchFilmsRes>{
    return this.http.get<ISearchFilmsRes>(`${this.url}/v2.1/films/search-by-keyword`, {
      params: {
        keyword,
        page
      }
    })
  }

}
