import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ScrollStateService{
   trendingSrollState = signal<number>(0);
   
}