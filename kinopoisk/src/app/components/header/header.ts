import { Component, inject } from '@angular/core';
import { SearchInput } from '../ui/search-input/search-input';
import { FilmsService } from '../../data/services/films';

@Component({
  selector: 'app-header',
  imports: [SearchInput],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  filmsService = inject(FilmsService)

  constructor(){
    // this.filmsService.getFilters().subscribe(console.log
    // )
  }

}
