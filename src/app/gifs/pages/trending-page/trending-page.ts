import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPage implements AfterViewInit {
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv') //Referenca al dom #groupDiv
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv)return;

    scrollDiv.scrollTop = this.scrollStateService.trendingSrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv)return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight; // Tamaño del viewport
    const scrollHeight = scrollDiv.scrollHeight; // Tamaño total del div

    this.scrollStateService.trendingSrollState.set(scrollTop);
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    if(isAtBottom){
      this.gifService.loadTrendingGifs();
    }
  }

  
}
