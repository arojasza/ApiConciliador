export interface Paginated<T> {
  totalCount: number;
  totalPages: number;
  result: T[];
}
