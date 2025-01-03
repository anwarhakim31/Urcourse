export interface ResponseApi {
  success: boolean;
  message: string;
  data: T;
  code: number;
}

export interface Paging {
  totalPage: number;
  page: number;
  limit: number;
  total: number;
}
