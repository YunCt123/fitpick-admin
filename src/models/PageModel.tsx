export interface Pagination {
  current: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationResponse<T> {
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages?: number;
  items: T[];
}