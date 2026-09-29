/** Datos que se recogen en cada paso del proceso de matrícula. */

export type FormerStudent = 'no' | 'si' | 'si-despues-2017';
export type PaymentMethod = 'tarjeta' | 'transferencia';

export interface Specialization {
  rama: string;
  provincia: string;
  exAlumno: FormerStudent;
  material: string;
}

export interface Modality {
  modalidad: string;
  horarios: string[];
}

export interface Rate {
  tarifaId: string;
}

export interface PersonalData {
  nombre: string;
  dni: string;
  movil: string;
  email: string;
}

export interface Address {
  comunidad: string;
  direccion: string;
  localidad: string;
  provincia: string;
  cp: string;
  aceptaLegal: boolean;
  aceptaPrivacidad: boolean;
}

export interface Payment {
  metodo: PaymentMethod;
  recomendado: boolean;
}

export interface Enrollment {
  specialization: Specialization | null;
  modality: Modality | null;
  rate: Rate | null;
  personalData: PersonalData | null;
  address: Address | null;
  payment: Payment | null;
  submitted: boolean;
}

/** Claves de los pasos que guardan datos, en orden. */
export type StepKey = Exclude<keyof Enrollment, 'submitted'>;
