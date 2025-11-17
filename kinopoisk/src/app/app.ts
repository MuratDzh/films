import { AfterViewInit, Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './data/services/modal.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {

  filmsService = inject(ModalService)
  
  @ViewChild("portal", {read: ViewContainerRef})
  portal: ViewContainerRef|null = null

  ngAfterViewInit(): void {
    this.filmsService.container = this.portal
  }
}
