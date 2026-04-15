import { ImageResponse } from './gallery-event.model';

export interface NewsResponse {
  id: string;
  title: string;
  description: string;
  image: ImageResponse | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsRequest {
  title: string;
  description: string;
  displayOrder: number;
}
