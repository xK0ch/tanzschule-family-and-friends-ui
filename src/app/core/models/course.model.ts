export interface CourseTariffResponse {
  id: number;
  name: string;
  price: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseTariffRequest {
  name: string;
  price: number;
}

export interface CourseResponse {
  id: number;
  name: string;
  startDate: string;
  startTime: string;
  endTime: string;
  numberOfHours: string;
  teacher: string;
  remark: string | null;
  partnerOption: boolean;
  categoryId: number;
  tariffs: CourseTariffResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseRequest {
  name: string;
  startDate: string;
  startTime: string;
  endTime: string;
  numberOfHours: string;
  teacher: string;
  remark: string | null;
  partnerOption: boolean;
  categoryId: number;
  tariffs: CourseTariffRequest[];
}

export interface CourseCategoryResponse {
  id: number;
  name: string;
  displayOrder: number;
  courses: CourseResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseCategoryRequest {
  name: string;
  displayOrder: number;
}

export interface CourseRegistrationRequest {
  salutation: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  street: string;
  city: string;
  phone: string;
  mobile?: string;
  email: string;
  remark?: string;
  tariffName: string;
  withPartner: boolean;
  partnerFirstName?: string;
  partnerLastName?: string;
  directDebit: boolean;
  accountHolder?: string;
  iban?: string;
  bic?: string;
}
