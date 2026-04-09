export interface ImageResponse {
  id: string;
  filename: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
  displayOrder: number;
  galleryEventId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryEventResponse {
  id: string;
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
