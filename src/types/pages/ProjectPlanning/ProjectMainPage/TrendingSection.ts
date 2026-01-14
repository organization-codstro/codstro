interface NewsItem {
  id: string;
  title: string;
  date: string;
}

export interface TrendingSectionProps {
  news: NewsItem[];
}
