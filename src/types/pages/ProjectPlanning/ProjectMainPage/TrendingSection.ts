interface NewsItem {
  id: number;
  title: string;
  date: string;
}

export interface TrendingSectionProps {
  news: NewsItem[];
}
