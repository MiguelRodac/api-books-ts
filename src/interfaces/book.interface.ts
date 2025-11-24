export interface BookRequest {
  title: string;
  description?: string;
  published_at?: string;
  available?: boolean;
  id_author: number;
}
