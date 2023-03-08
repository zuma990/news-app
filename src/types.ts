export interface Article {
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  source: {
    id: string | null;
    name: string;
  };
}
export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
