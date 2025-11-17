import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { IFilm } from '../../../data/interfaces/film.interface';
import { ModalService } from '../../../data/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {

  @Input()
  film!: IFilm

  isFirstClickOnWindow = true

  modalService = inject(ModalService)
  router = inject(Router)

  @HostListener('window:click', ['$event'])
  onWinClick(e: Event){
    if((e.target as HTMLElement).offsetParent
    &&(e.target as HTMLElement).offsetParent?.classList ){
      
      this.isFirstClickOnWindow = true
      if((e.target as HTMLElement).offsetParent?.classList.contains('film-description_wrapper')){
        e.stopPropagation()
          return
        }
    }
      if(!this.isFirstClickOnWindow){

       this.onClose()
      }
      this.isFirstClickOnWindow = false
  }

  onClick(){
    
    this.router.navigate([`film/${this.film.kinopoiskId||this.film.filmId}`])
    this.onClose()
  }

  onClose(){
     this.modalService.closeModal()
  }
}
