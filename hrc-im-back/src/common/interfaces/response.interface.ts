export interface ApiResponse<T> {
  message: string;
  data: T;
  records?: number;
}
