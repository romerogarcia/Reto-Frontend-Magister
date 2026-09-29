import { FormerStudent, PaymentMethod, StepKey } from './enrollment.model';

export interface Option<T = string> {
  value: T;
  label: string;
}

/** Configuración visual de cada paso (menú lateral e ilustración). */
export interface StepConfig {
  key: StepKey;
  path: string;
  label: string;
  image: string;
  /** Clase BEM del bloque lateral (la página de dirección usaba una propia). */
  sidebarBlock: 'section1' | 'section1-address';
  imageClass: string;
}

export const STEPS: readonly StepConfig[] = [
  {
    key: 'specialization',
    path: 'specialized',
    label: '¿En qué te quieres especializar?',
    image: 'images/image1.png',
    sidebarBlock: 'section1',
    imageClass: 'person-image',
  },
  {
    key: 'modality',
    path: 'modality',
    label: 'Horario y Modalidad',
    image: 'images/image2.png',
    sidebarBlock: 'section1',
    imageClass: 'section1__image',
  },
  {
    key: 'rate',
    path: 'rates',
    label: 'Tarifa',
    image: 'images/image3.png',
    sidebarBlock: 'section1',
    imageClass: 'person-image',
  },
  {
    key: 'personalData',
    path: 'data',
    label: 'Datos personales',
    image: 'images/image4.png',
    sidebarBlock: 'section1',
    imageClass: 'person-image',
  },
  {
    key: 'address',
    path: 'address',
    label: 'Dirección',
    image: 'images/image5.png',
    sidebarBlock: 'section1-address',
    imageClass: 'section1-address__image',
  },
  {
    key: 'payment',
    path: 'payment',
    label: 'Forma de pago',
    image: 'images/image6.png',
    sidebarBlock: 'section1',
    imageClass: 'section1__image',
  },
];

export const RAMAS: readonly string[] = [
  'Maestros - Audición y lenguajes',
  'Trabajadores Sociales - Discapacidad',
];

export const PROVINCIAS: readonly string[] = ['Madrid', 'Cádiz'];

export const EX_ALUMNO_OPTIONS: readonly (Option<FormerStudent> & { cssClass: string })[] = [
  { value: 'no', label: 'No', cssClass: 'section2__container-b__button' },
  { value: 'si', label: 'Si', cssClass: 'section2__container-b__button' },
  {
    value: 'si-despues-2017',
    label: 'Sí, después de 2017',
    cssClass: 'section2__container-b__button-b',
  },
];

export const MATERIAL = 'Material mes a mes';

export const MODALIDADES: readonly string[] = [
  'Presencial 2020/2021',
  'Semipresencial 2020/2021',
  'Videoconferencia en directo 2020/2021',
  'Adaptación a la Lomloe',
];

export const HORARIOS: readonly string[] = [
  '1 Clase al mes Prácticas y Programación sábados por la mañana. Grupo 1 de 10 a 14 horas',
  '1 Clase al mes Prácticas y Programación sábados por la mañana. Grupo 2 de 10 a 14 horas',
  '1 Clase al mes Prácticas y Programación viernes por la tarde. Grupo 3 de 16 a 20 horas',
];

/** Número de selectores de horario que muestra el diseño. */
export const HORARIO_SLOTS = 3;

export interface RateOption {
  id: string;
  descripcion: string;
  precio: number;
  cssClass: string;
}

export const TARIFAS: readonly RateOption[] = [
  {
    id: 'semi-mes',
    descripcion: 'Inicio febrero 2021. Nuevo alumno SEMIPRESENCIAL - Material mes a mes -',
    precio: 101,
    cssClass: 'section2__container-rates-list__button-1',
  },
  {
    id: 'mensualidad',
    descripcion: 'Inicio febrero 2021. Nuevo alumno SOLO MENSUALIDAD - Material mes a mes -',
    precio: 115,
    cssClass: 'section2__container-rates-list__button-2',
  },
  {
    id: 'semi-matricula',
    descripcion:
      'Inicio febrero 2021. Nuevo alumno SEMIPRESENCIAL - Material mes a mes + MATRÍCULA -',
    precio: 216,
    cssClass: 'section2__container-rates-list__button-3',
  },
];

export const COMUNIDADES: readonly string[] = ['Madrid'];

export const METODOS_PAGO: readonly Option<PaymentMethod>[] = [
  { value: 'tarjeta', label: 'Tarjeta de crédito/cébito (Recomendado)' },
  { value: 'transferencia', label: 'Transferencia bancaria' },
];
