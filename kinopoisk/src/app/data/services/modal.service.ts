import { Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public container: ViewContainerRef|null = null

  createModal<T>(c:Type<T>){
    if(this.container){
      this.container.clear()
      return this.container.createComponent(c)
    }

    return
  }

  closeModal(){
     if(this.container){
      this.container.clear()
    }
  }
}
