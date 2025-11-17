import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, inject, Input, OnChanges, OnInit, Output, QueryList, Renderer2, signal, SimpleChanges, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-paginations',
  imports: [CommonModule],
  templateUrl: './paginations.html',
  styleUrl: './paginations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Paginations implements OnInit, AfterViewChecked, OnChanges {

  renderer = inject(Renderer2)

  @Input()
  pagesCount: number = 2

  @Input()
  currentPage: number = 1

  @Output()
  checkedPage = new EventEmitter<number>()

  pages = signal<number[]>([])

  @ViewChildren('btn', {read: ElementRef})
  btns!: QueryList<ElementRef<HTMLButtonElement>>

  @HostListener("click", ["$event"])

  onClick(e: Event){
    
    this.renderer.removeClass(this.btns.filter(v=>+v.nativeElement.innerHTML == this.currentPage)[0].nativeElement, "active")
    this.checkedPage.emit(+((e.target as HTMLButtonElement).innerText))
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes["currentPage"]){

      this.currentPage = changes["currentPage"].currentValue
    }
    
  }

  ngOnInit(): void {

    for(let i=1; i <= this.pagesCount; i++){
      this.pages.update((v)=>v.concat(i))
    }
  }

  ngAfterViewChecked(): void {
    
    this.renderer.addClass(this.btns.filter(v=>+v.nativeElement.innerHTML == this.currentPage)[0].nativeElement, "active")
  }
}
