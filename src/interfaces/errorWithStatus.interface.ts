export interface ErrorWithStatus extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
}
