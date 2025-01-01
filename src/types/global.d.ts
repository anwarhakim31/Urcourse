export interface ResponseApi {
  success: boolean;
  message: string;
  data: T;
  code: number;
}
