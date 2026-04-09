export interface CourseTariffResponse {
  id: string;
  name: string;
  price: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseTariffRequest {
  name: string;
  price: number;
}

export interface CourseResponse {
  id: string;
  name: string;
  startDate: string;
  startTime: string;
  endTime: string;
  numberOfHours: string;
  teacher: string;
  remark: string | null;
  partnerOption: boolean;
  displayOrder: number;
  categoryId: string;
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
  categoryId: string;
  tariffs: CourseTariffRequest[];
}

export interface CourseCategoryResponse {
  id: string;
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
  partnerSalutation?: string;
  partnerFirstName?: string;
  partnerLastName?: string;
  partnerBirthDate?: string;
  partnerStreet?: string;
  partnerCity?: string;
  partnerPhone?: string;
  partnerMobile?: string;
  partnerEmail?: string;
  directDebit: boolean;
  accountHolder?: string;
  iban?: string;
  bic?: string;
  samePaymentDetails?: boolean;
  partnerAccountHolder?: string;
  partnerIban?: string;
  partnerBic?: string;
}
