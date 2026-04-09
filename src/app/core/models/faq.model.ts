export interface FaqResponse {
  id: string;
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
