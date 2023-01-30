import { Category } from "./Category";

export type Anime = {
  id: number;
  name: string;
  synopsis: string;
  avaliation: number;
  lauchYear: number;
  imgUrl: string;
  categories: Category[];
}

