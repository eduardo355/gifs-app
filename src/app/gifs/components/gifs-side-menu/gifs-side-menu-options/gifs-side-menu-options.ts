import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from 'src/app/gifs/services/gifs.service';

interface MenuOptions {
  label: string;
  subLabel: string;
  router: string;
  icon: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
})
export class GifsSideMenuOptions {
  gifService = inject(GifsService);
  menuOptions: MenuOptions[] = [
    {
      label: 'Trending',
      icon: 'fa-solid fa-chart-line',
      subLabel: 'Gifs Populares',
      router: '/dashboard/trending',
    },
    {
      label: 'Buscador',
      icon: 'fa-solid fa-magnifying-glass',
      subLabel: 'Buscar gifs',
      router: '/dashboard/search',
    },
  ];
}
