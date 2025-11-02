export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  duration: string;
  addedDate: Date;
  publishDate: Date;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  videoCount: number;
}

export type SortOption = "addedDate" | "publishDate" | "title" | "channel";
export type SortOrder = "asc" | "desc";

export interface FilterOptions {
  searchQuery: string;
  sortBy: SortOption;
  sortOrder: SortOrder;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
