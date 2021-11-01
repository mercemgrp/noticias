import { ArticleDTO } from "../dtos/articles-dto";

export interface ArticleUi {
  article: ArticleDTO;
  id: string;
  selected: boolean;
}
