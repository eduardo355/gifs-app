import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsListItem {
  url = input.required<string>();
}
