import { Routes } from '@angular/router';
import { FilmsList } from './pages/films-list/films-list';
import { Film } from './pages/film/film';
import { SearchResult } from './pages/search-result/search-result';

export const routes: Routes = [
    {
        path: "", pathMatch: "full", redirectTo: "films"
    },
    {
        path: "films", component: FilmsList
    },
    {
        path: "film/:id", component: Film
    },
    {
        path: "searched-films", component: SearchResult
    },
    {
        path: "**", redirectTo: "films"
    }
];
