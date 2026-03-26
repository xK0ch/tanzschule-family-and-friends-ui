export interface FaqResponse {
  id: number;
  question: string;
  answer: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface FaqRequest {
  question: string;
  answer: string;
  displayOrder: number;
}
