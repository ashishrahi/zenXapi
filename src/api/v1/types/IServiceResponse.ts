export interface ServiceResponse<T> {
    id?: string;
  status?: boolean;
  message?: string;
  data?: T;
  error?: string;
}