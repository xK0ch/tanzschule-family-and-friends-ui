export interface ImageResponse {
  id: number;
  filename: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  displayOrder: number;
  galleryEventId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryEventResponse {
  id: number;
  name: string;
  date: string;
  images: ImageResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface GalleryEventRequest {
  name: string;
  date: string;
}
