export interface ServiceResponse<T> {
    id?: string;
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
}