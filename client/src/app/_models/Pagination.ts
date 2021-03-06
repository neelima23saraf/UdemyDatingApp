export interface Pagination{
    currenPage : Number;
    itemsPerPage: Number;
    totalItems: Number;
    totalPages: number;
}

export class PaginatedResult<T>{
    result: T;
    pagination: Pagination;
}