import {Component} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'spinner',
  templateUrl: 'spinner.html',
  imports: [MatProgressSpinnerModule],
})
export class Spinner {}