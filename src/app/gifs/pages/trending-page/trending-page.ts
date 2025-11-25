import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifsList } from '../../components/gifs-list/gifs-list';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifsList],
  templateUrl: './trending-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPage {
  gifService = inject(GifsService);
}
