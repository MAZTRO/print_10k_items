export type itemsType = {
  id: number;
  name: string;
  age: number;
  description: string;
  image: string;
  abilities: string[];
}

export type SortingType =
  | 'nameAsc'
  | 'nameDesc'
  | 'ageAsc'
  | 'ageDesc'
  | '';

export type sortingOptionsType = { value: SortingType, label: string }

export interface sortingStoreType {
  sortingStore: sortingOptionsType;
  changeSortingStore: (data: sortingOptionsType) => void;
}

export interface filtersStoreType {
  nameFilter: string;
  descriptionFilter: string;
  changeNameFilter: (data: string) => void;
  changeDescriptionFilter: (data: string) => void;
}

export const LIMITER_LENGHT = 20
