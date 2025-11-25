import { Gif } from "../interfaces/gif.interface";
import { Gif as GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
   static mapGiphyItemToGif(item: GiphyItem): Gif {
      return {
         id: item.id,
         title: item.title,
         url: item.images.original.url,
      }
   }

   static mapGiphyResultToGifs(items: GiphyItem[]): Gif[] {
      return items.map((item) => this.mapGiphyItemToGif(item));
   }
}  