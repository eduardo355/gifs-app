import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifsList } from "../../components/gifs-list/gifs-list";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsList],
  templateUrl: './search-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPage {
  gifService = inject(GifsService);
  searchGifs = signal<Gif[]>([]);

  onSearch(search: string) {
    this.gifService.searchGifs(search).subscribe((response) => {
      this.searchGifs.set(response);
    })
  }
}
