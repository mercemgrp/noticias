import { ArticleDTO } from "./dtos/news";

export interface ArticleUi {
  article: ArticleDTO;
  id: string;
  selected: boolean;
}
