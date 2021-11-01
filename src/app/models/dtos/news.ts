export interface NewsDTO {
  articles: ArticleDTO[];
  status: string;
}

export interface ArticleDTO {
  author: string;
  content: string;
  description: string;
  publishedAdt: string;
  title: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  }
}
