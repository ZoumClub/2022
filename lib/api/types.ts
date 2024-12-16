export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface ApiError extends Error {
  code?: string;
  details?: string;
  hint?: string;
}

export class FetchError extends Error implements ApiError {
  constructor(
    message: string,
    public code?: string,
    public details?: string,
    public hint?: string
  ) {
    super(message);
    this.name = 'FetchError';
  }
}