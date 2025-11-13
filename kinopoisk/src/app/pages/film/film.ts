import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-film',
  imports: [],
  templateUrl: './film.html',
  styleUrl: './film.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Film {

}
