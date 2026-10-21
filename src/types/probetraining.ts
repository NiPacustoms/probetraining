export interface ProbetrainingFormData {
  spielerName: string;
  geburtsjahr: number | '';
  jugend: string;
  kontaktperson: string;
  email: string;
  telefon: string;
  nachricht?: string;
  dsgvoAccepted: boolean;
  honeypot?: string;
  formStartTime?: number;
}

export interface YouthTeam {
  id: string;
  name: string;
  ageGroup: string;
  minYear: number;
  maxYear: number;
  description: string;
  focus: string;
  coachContact?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  id?: string;
  demoMode?: boolean;
  data?: T;
}
