export interface Gif {
   type: string;
   id: string;
   url: string;
   slug: string;
   bitly_gif_url: string;
   bitly_url: string;
   embed_url: string;
   username: string;
   source: string;
   title: string;
   rating: string;
   content_url: string;
   source_tld: string;
   source_post_url: string;
   is_sticker: number;
   import_datetime: string;
   trending_datetime: string;
   images: Images;
}

export interface Images {
   original: Original;
}

export interface Original {
   height: string;
   width: string;
   size: string;
   url: string;
   mp4_size: string;
   mp4: string;
   webp_size: string;
   webp: string;
}

export interface Meta {
   status: number;
   msg: string;
   response_id: string;
}

export interface Pagination {
   total_count: number;
   count: number;
   offset: number;
}

export interface GiphyResult {
   data: Gif[];
   meta: Meta;
   pagination: Pagination;
}