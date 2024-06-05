import { SortTypeValues } from './SortType';

export type SortOptions = {
  [key in SortTypeValues]: string;
};
