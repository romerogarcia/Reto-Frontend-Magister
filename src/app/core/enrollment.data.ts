import { FormerStudent, PaymentMethod, StepKey } from './enrollment.model';

export interface Option<T = string> {
  value: T;
  label: string;
}

/** Configuración de cada paso: ruta, texto del menú, título e ilustración. */
export interface StepConfig {
  key: StepKey;
  path: string;
  label: string;
  title: string;
  image: string;
}

export const STEPS: readonly StepConfig[] = [
  {
    key: 'specialization',
    path: 'specialized',
    label: '¿En qué te quieres especializar?',
    title: '¿En qué te quieres especializar?',
    image: 'images/image1.png',
  },
  {
    key: 'modality',
    path: 'modality',
    label: 'Horario y Modalidad',
    title: 'Elige el horario y modalidad que más te acomode',
    image: 'images/image2.png',
  },
  {
    key: 'rate',
    path: 'rates',
    label: 'Tarifa',
    title: 'Selecciona tu tarifa',
    image: 'images/image3.png',
  },
  {
    key: 'personalData',
    path: 'data',
    label: 'Datos personales',
    title: 'Tus datos personales',
    image: 'images/image4.png',
  },
  {
    key: 'address',
    path: 'address',
    label: 'Dirección',
    title: 'Tu dirección',
    image: 'images/image5.png',
  },
  {
    key: 'payment',
    path: 'payment',
    label: 'Forma de pago',
    title: 'Forma de pago',
    image: 'images/image6.png',
  },
];

export const RAMAS: readonly string[] = [
  'Maestros - Audición y lenguajes',
  'Trabajadores Sociales - Discapacidad',
];

export const PROVINCIAS: readonly string[] = ['Madrid', 'Cádiz'];

export const EX_ALUMNO_OPTIONS: readonly Option<FormerStudent>[] = [
  { value: 'no', label: 'No' },
  { value: 'si', label: 'Sí' },
  { value: 'si-despues-2017', label: 'Sí, después de 2017' },
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
}

export const TARIFAS: readonly RateOption[] = [
  {
    id: 'semi-mes',
    descripcion: 'Inicio febrero 2021. Nuevo alumno SEMIPRESENCIAL - Material mes a mes -',
    precio: 101,
  },
  {
    id: 'mensualidad',
    descripcion: 'Inicio febrero 2021. Nuevo alumno SOLO MENSUALIDAD - Material mes a mes -',
    precio: 115,
  },
  {
    id: 'semi-matricula',
    descripcion:
      'Inicio febrero 2021. Nuevo alumno SEMIPRESENCIAL - Material mes a mes + MATRÍCULA -',
    precio: 216,
  },
];

export const COMUNIDADES: readonly string[] = ['Madrid'];

export const METODOS_PAGO: readonly Option<PaymentMethod>[] = [
  { value: 'tarjeta', label: 'Tarjeta de crédito/débito (Recomendado)' },
  { value: 'transferencia', label: 'Transferencia bancaria' },
];
