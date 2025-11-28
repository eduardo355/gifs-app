import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { GiphyResult } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

function loadHistoryLocalStorage(): Record<string, Gif[]> {
  const history = localStorage.getItem('history');
  return history ? JSON.parse(history) : {};
}

@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);
  private trendingPage = signal<number>(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i+3));
    }
    return groups;
  });

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('history', historyString);
  });

  searchHistory = signal<Record<string, Gif[]>>(loadHistoryLocalStorage());
  searchHistoryKeys = computed(() => {
    return Object.keys(this.searchHistory());
  });

  loadTrendingGifs() {
    if(this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.http
      .get<GiphyResult>(`${environment.gifApiUrl}/gifs/trending`, {
        params: {
          api_key: environment.gifApiKey,
          limit: 21,
          offset: this.trendingPage() * 21
        },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyResultToGifs(response.data);
        this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
        this.trendingGifsLoading.set(false);
        this.trendingPage.update(currentPage=>currentPage+1);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResult>(`${environment.gifApiUrl}/gifs/search`, {
        params: {
          q: query.trim().toLowerCase(),
          api_key: environment.gifApiKey,
          limit: 20,
        },
      })
      .pipe(
        map((response) => GifMapper.mapGiphyResultToGifs(response.data)),
        tap((items) => {
          this.searchHistory.update((prev) => ({ ...prev, [query.toLowerCase()]: items }));
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
