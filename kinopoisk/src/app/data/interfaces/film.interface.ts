export interface ICountry{
    country: string
}

export interface IGenre{
    genre: string
}

export type FilmType = "FILM"|"TV_SHOW "|"TV_SERIES"|"MINI_SERIES"|"ALL";

export interface IFilm {
    kinopoiskId: number,
    imdbId: null|number,
    nameRu: null|string,
    nameEn: null|string,
    nameOriginal: null|string,
    countries: ICountry[],
    genres: IGenre[],
    ratingKinopoisk: null|number,
    ratingImdb: null|number,
    year: number,
    type: FilmType,
    posterUrl: string,
    posterUrlPreview: string
}

export interface IFilmsRes {
    items: IFilm[],
    total: number,
    totalPage: number
}

export interface ISearchFilmsRes {
    keyword: string,
    pagesCount: number,
    films: IFilm[]
}

export interface IFilmFull extends IFilm {
  coverUrl: string|null,
  logoUrl: string|null,
  reviewsCount: number|null,
  ratingGoodReview: number|null,
  ratingGoodReviewVoteCount: number|null,
  ratingKinopoiskVoteCount: number|null,
  ratingImdbVoteCount: number|null,
  ratingFilmCritics: number|null,
  ratingFilmCriticsVoteCount: number|null,
  ratingAwait: number|null,
  ratingAwaitCount: number|null,
  ratingRfCritics: number|null,
  ratingRfCriticsVoteCount: number|null,
  filmLength: number|null,
  slogan: string|null,
  description: string|null,
  shortDescription: string|null
}

export interface IFilterOpt {
    countries: number,
    genres: number,
    type: FilmType,
    order: "RATING"|"NUM_VOTE"|"YEAR",
    ratingFrom: number,
    ratingTo: number,
    yearFrom: number,
    yearTo: number,
    keyword: string,
    page: number
}

export interface IFilterFormOpt {
    countries: string,
    genres: string,
    type: FilmType,
    order: "RATING"|"NUM_VOTE"|"YEAR",
    ratingFrom: string,
    ratingTo: string,
    yearFrom: string,
    yearTo: string,
    keyword: string
}

