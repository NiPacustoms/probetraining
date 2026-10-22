export interface CoachContact {
  name: string;
  phone?: string;
  role?: string;
}

export type TrainingPlace = 'kunstrasen' | 'feigehalle' | 'augustahalle';
export type Weekday = 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr';

export interface TrainingSession {
  day: Weekday;
  start: string;
  end: string;
  place: TrainingPlace;
}

export const PLACE_LABEL: Record<TrainingPlace, string> = {
  kunstrasen: 'Kunstrasen',
  feigehalle: 'FeigeHalle',
  augustahalle: 'AugustaHalle',
};

export const PLAN_LABEL = 'Winterplan ab 01.10.26';

export function formatSession(s: TrainingSession): string {
  return `${s.day} ${s.start}–${s.end} (${PLACE_LABEL[s.place]})`;
}

export interface YouthTeamDetail {
  id: string;
  category: 'G-Jugend' | 'F-Jugend' | 'E-Jugend' | 'D-Jugend' | 'C-Jugend' | 'B-Jugend' | 'Mädchen';
  name: string;
  shortName: string;
  ageGroupCode: string;
  birthYears: string;
  minYear: number;
  maxYear: number;
  /** Winterplan 26/27 (ab 01.10.26) */
  sessions: TrainingSession[];
  /** Ausweichzeiten bei Hallensperrung oder in den Ferien */
  fallback: TrainingSession[];
  fieldFormat: string;
  ballSize: string;
  coaches: CoachContact[];
  notes?: string;
}

export const OFFICIAL_YOUTH_TEAMS: YouthTeamDetail[] = [
  // G-Jugend / Bambini
  {
    id: 'g2-jugend',
    category: 'G-Jugend',
    name: 'G2-Jugend (Ballgewöhnung)',
    shortName: 'G2-Jugend',
    ageGroupCode: 'U5 / U6',
    birthYears: '2021 & jünger',
    minYear: 2021,
    maxYear: 2024,
    sessions: [
      { day: 'Mi', start: '16:00', end: '17:00', place: 'feigehalle' },
      { day: 'Do', start: '16:00', end: '17:00', place: 'augustahalle' },
      { day: 'Fr', start: '16:00', end: '17:00', place: 'feigehalle' }
    ],
    fallback: [
      { day: 'Mi', start: '17:00', end: '18:15', place: 'kunstrasen' },
      { day: 'Fr', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fieldFormat: 'Kinderfußball / Funino 3 vs. 3',
    ballSize: 'Größe 3 (Leichtball 290g)',
    coaches: [
      { name: 'Julian', phone: '0155-666 503 23', role: 'Trainer' },
      { name: 'Niklas', phone: '0177-713 91 93', role: 'Trainer' },
      { name: 'Fynn', phone: '0178-337 04 91', role: 'Trainer' },
      { name: 'Nadine', role: 'Betreuerin' }
    ],
    notes: 'Spielerische Bewegungskoordination und erste Ballkontakte'
  },
  {
    id: 'g1-jugend',
    category: 'G-Jugend',
    name: 'G1-Jugend (Minikicker)',
    shortName: 'G1-Jugend',
    ageGroupCode: 'U7',
    birthYears: '2020',
    minYear: 2020,
    maxYear: 2020,
    sessions: [
      { day: 'Mi', start: '16:00', end: '17:00', place: 'feigehalle' },
      { day: 'Fr', start: '17:00', end: '18:00', place: 'feigehalle' }
    ],
    fallback: [
      { day: 'Mi', start: '17:00', end: '18:15', place: 'kunstrasen' },
      { day: 'Fr', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fieldFormat: 'Kinderfußball / 3 vs. 3 auf 4 Minitore',
    ballSize: 'Größe 3 (Leichtball 290g)',
    coaches: [
      { name: 'Patrick', phone: '0160-97 971 538', role: 'Cheftrainer' },
      { name: 'Sebastian', phone: '01512-41 98 161', role: 'Co-Trainer' }
    ],
    notes: 'Erste Pass- und Spielformen mit viel Spielfreude'
  },

  // F-Jugend
  {
    id: 'f2-jugend',
    category: 'F-Jugend',
    name: 'F2-Jugend',
    shortName: 'F2-Jugend',
    ageGroupCode: 'U8',
    birthYears: '2019',
    minYear: 2019,
    maxYear: 2019,
    sessions: [
      { day: 'Mi', start: '17:00', end: '18:15', place: 'kunstrasen' },
      { day: 'Fr', start: '17:00', end: '18:00', place: 'feigehalle' }
    ],
    fallback: [
      { day: 'Mo', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fieldFormat: 'DFB-Kinderfußball / 4 vs. 4 & 5 vs. 5',
    ballSize: 'Größe 3 / 4 (290g)',
    coaches: [
      { name: 'Thorsten', phone: '0170-96 01 008', role: 'Trainer' },
      { name: 'Christos', phone: '0178-15 90 748', role: 'Trainer' },
      { name: 'Marvin', phone: '0157-34 297 050', role: 'Trainer' }
    ]
  },
  {
    id: 'f1-jugend',
    category: 'F-Jugend',
    name: 'F1-Jugend',
    shortName: 'F1-Jugend',
    ageGroupCode: 'U9',
    birthYears: '2018',
    minYear: 2018,
    maxYear: 2018,
    sessions: [
      { day: 'Mi', start: '17:00', end: '18:15', place: 'kunstrasen' },
      { day: 'Fr', start: '16:00', end: '17:00', place: 'feigehalle' }
    ],
    fallback: [
      { day: 'Fr', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fieldFormat: 'DFB-Kinderfußball & Spielfeste',
    ballSize: 'Größe 4 (290g)',
    coaches: [
      { name: 'Detlef', phone: '01573-31 05 346', role: 'Cheftrainer' },
      { name: 'Christian', phone: '0174-99 65 738', role: 'Trainer' },
      { name: 'Kemal, Oktay, Ferat', role: 'Trainerteam' }
    ]
  },

  // Mädchen U9
  {
    id: 'u9-maedchen',
    category: 'Mädchen',
    name: 'U9-Mädchen',
    shortName: 'U9-Mädchen',
    ageGroupCode: 'U9 Juniorinnen',
    birthYears: '2018 / 2019',
    minYear: 2018,
    maxYear: 2019,
    sessions: [
      { day: 'Di', start: '17:00', end: '18:15', place: 'kunstrasen' },
      { day: 'Mi', start: '18:00', end: '19:00', place: 'feigehalle' }
    ],
    fallback: [
      { day: 'Do', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fieldFormat: 'Kleinfeld 5 vs. 5 & Minitore',
    ballSize: 'Größe 3 / 4 (290g)',
    coaches: [
      { name: 'Michelle', phone: '0176-15 195 663', role: 'Trainerin' },
      { name: 'Raphael', phone: '0177-32 22 955', role: 'Trainer' }
    ],
    notes: 'Spezielles Einsteigerteam für junge Kickerinnen'
  },

  // E-Jugend
  {
    id: 'e4-jugend',
    category: 'E-Jugend',
    name: 'E4-Jugend',
    shortName: 'E4-Jugend',
    ageGroupCode: 'U10',
    birthYears: '2017',
    minYear: 2017,
    maxYear: 2017,
    sessions: [
      { day: 'Mo', start: '17:00', end: '18:15', place: 'kunstrasen' },
      { day: 'Mi', start: '17:00', end: '18:00', place: 'feigehalle' }
    ],
    fallback: [
      { day: 'Do', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fieldFormat: 'Kleinfeld 7 vs. 7',
    ballSize: 'Größe 4 (350g)',
    coaches: [
      { name: 'Dominik', phone: '0176-82 239 437', role: 'Trainer' },
      { name: 'Maik', phone: '0157-55 543 073', role: 'Trainer' }
    ]
  },
  {
    id: 'e3-jugend',
    category: 'E-Jugend',
    name: 'E3-Jugend',
    shortName: 'E3-Jugend',
    ageGroupCode: 'U10',
    birthYears: '2017',
    minYear: 2017,
    maxYear: 2017,
    sessions: [
      { day: 'Mo', start: '17:00', end: '18:15', place: 'kunstrasen' },
      { day: 'Mi', start: '17:00', end: '18:00', place: 'feigehalle' }
    ],
    fallback: [
      { day: 'Do', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fieldFormat: 'Kleinfeld 7 vs. 7',
    ballSize: 'Größe 4 (350g)',
    coaches: [
      { name: 'Christian', phone: '0179-57 22 427', role: 'Trainer' },
      { name: 'Melanie', phone: '0152-24 878 865', role: 'Trainerin' },
      { name: 'Patrick, Pascal', role: 'Trainerteam' }
    ]
  },
  {
    id: 'e2-jugend',
    category: 'E-Jugend',
    name: 'E2-Jugend',
    shortName: 'E2-Jugend',
    ageGroupCode: 'U11',
    birthYears: '2016',
    minYear: 2016,
    maxYear: 2016,
    sessions: [
      { day: 'Mi', start: '19:00', end: '20:00', place: 'feigehalle' },
      { day: 'Do', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fallback: [
      { day: 'Di', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fieldFormat: 'Kleinfeld 7 vs. 7',
    ballSize: 'Größe 4 (350g)',
    coaches: [
      { name: 'Marcel', phone: '0177-27 61 291', role: 'Trainer' },
      { name: 'Manuel', phone: '0173-15 99 992', role: 'Trainer' }
    ]
  },
  {
    id: 'e1-jugend',
    category: 'E-Jugend',
    name: 'E1-Jugend',
    shortName: 'E1-Jugend',
    ageGroupCode: 'U11',
    birthYears: '2016',
    minYear: 2016,
    maxYear: 2016,
    sessions: [
      { day: 'Di', start: '18:15', end: '19:30', place: 'kunstrasen' },
      { day: 'Do', start: '18:15', end: '19:30', place: 'kunstrasen' }
    ],
    fallback: [],
    fieldFormat: 'Kleinfeld 7 vs. 7',
    ballSize: 'Größe 4 (350g)',
    coaches: [
      { name: 'Marc', phone: '0157-731 97 145', role: 'Cheftrainer' },
      { name: 'Daniel', phone: '0157-31 306 965', role: 'Trainer' },
      { name: 'Daniel, Michel, Jana', role: 'Trainerteam' }
    ]
  },

  // Mädchen U11
  {
    id: 'u11-maedchen',
    category: 'Mädchen',
    name: 'U11-Mädchen / Juniorinnen',
    shortName: 'U11-Mädchen',
    ageGroupCode: 'U11 Juniorinnen',
    birthYears: '2016 / 2017',
    minYear: 2016,
    maxYear: 2017,
    sessions: [
      { day: 'Mi', start: '18:00', end: '19:00', place: 'feigehalle' },
      { day: 'Fr', start: '18:00', end: '19:30', place: 'kunstrasen' }
    ],
    fallback: [
      { day: 'Di', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fieldFormat: 'Kleinfeld 7 vs. 7',
    ballSize: 'Größe 4 (350g)',
    coaches: [
      { name: 'Jessy', phone: '0176-46 082 208', role: 'Cheftrainerin' },
      { name: 'Nadine', role: 'Trainerin' },
      { name: 'Maren', role: 'Co-Trainerin' }
    ],
    notes: 'Spiel & Spaß im Mädchen-Team am Katzenbusch'
  },

  // D-Jugend
  {
    id: 'd1-jugend',
    category: 'D-Jugend',
    name: 'D1-Jugend',
    shortName: 'D1-Jugend',
    ageGroupCode: 'U12 / U13',
    birthYears: '2015',
    minYear: 2015,
    maxYear: 2015,
    sessions: [
      { day: 'Di', start: '18:15', end: '19:30', place: 'kunstrasen' },
      { day: 'Do', start: '18:15', end: '19:30', place: 'kunstrasen' }
    ],
    fallback: [],
    fieldFormat: 'Kompaktfeld 9 vs. 9',
    ballSize: 'Größe 4 (350g)',
    coaches: [
      { name: 'Dirk', phone: '0175-48 17 892', role: 'Trainer' },
      { name: 'Moussa', phone: '0172-96 88 391', role: 'Trainer' },
      { name: 'Rebecca, Marcel', role: 'Trainerteam' }
    ]
  },

  // Mädchen U13
  {
    id: 'u13-maedchen',
    category: 'Mädchen',
    name: 'U13-Mädchen',
    shortName: 'U13-Mädchen',
    ageGroupCode: 'U13 Juniorinnen',
    birthYears: '2014 / 2015',
    minYear: 2014,
    maxYear: 2015,
    sessions: [
      { day: 'Di', start: '17:00', end: '18:15', place: 'kunstrasen' },
      { day: 'Fr', start: '17:00', end: '18:15', place: 'kunstrasen' }
    ],
    fallback: [],
    fieldFormat: 'Kompaktfeld 9 vs. 9',
    ballSize: 'Größe 4 (350g)',
    coaches: [
      { name: 'Sebastian', phone: '0173-70 21 295', role: 'Trainer' },
      { name: 'Muhamed', phone: '0157-55 750 746', role: 'Trainer' },
      { name: 'Sascha', role: 'Trainer' }
    ]
  },

  // C-Jugend
  {
    id: 'c2-jugend',
    category: 'C-Jugend',
    name: 'C2-Jugend',
    shortName: 'C2-Jugend',
    ageGroupCode: 'U14',
    birthYears: '2013 / 2014',
    minYear: 2013,
    maxYear: 2014,
    sessions: [
      { day: 'Mo', start: '18:15', end: '19:30', place: 'kunstrasen' },
      { day: 'Mi', start: '18:00', end: '19:30', place: 'kunstrasen' }
    ],
    fallback: [],
    fieldFormat: 'Großfeld 11 vs. 11',
    ballSize: 'Größe 5 (Normalball)',
    coaches: [
      { name: 'Nadine', phone: '0152-08 872 011', role: 'Trainerin' },
      { name: 'Justin', phone: '0157-37 757 017', role: 'Trainer' },
      { name: 'Mohamed, Mike', role: 'Trainerteam' }
    ]
  },
  {
    id: 'c1-jugend',
    category: 'C-Jugend',
    name: 'C1-Jugend',
    shortName: 'C1-Jugend',
    ageGroupCode: 'U15',
    birthYears: '2012 / 2013',
    minYear: 2012,
    maxYear: 2013,
    sessions: [
      { day: 'Mo', start: '18:15', end: '19:30', place: 'kunstrasen' },
      { day: 'Do', start: '18:15', end: '19:30', place: 'kunstrasen' }
    ],
    fallback: [],
    fieldFormat: 'Großfeld 11 vs. 11',
    ballSize: 'Größe 5 (Normalball)',
    coaches: [
      { name: 'Marc', phone: '0179-60 49 451', role: 'Cheftrainer' },
      { name: 'Barto', phone: '0172-53 24 788', role: 'Trainer' },
      { name: 'Lakshan', role: 'Betreuer' }
    ]
  },

  // Mädchen U15
  {
    id: 'u15-maedchen',
    category: 'Mädchen',
    name: 'U15-Mädchen',
    shortName: 'U15-Mädchen',
    ageGroupCode: 'U15 Juniorinnen',
    birthYears: '2012 / 2013',
    minYear: 2012,
    maxYear: 2013,
    sessions: [
      { day: 'Di', start: '18:15', end: '19:30', place: 'kunstrasen' },
      { day: 'Fr', start: '18:00', end: '19:30', place: 'kunstrasen' }
    ],
    fallback: [],
    fieldFormat: 'Großfeld 11 vs. 11',
    ballSize: 'Größe 5 (Normalball)',
    coaches: [
      { name: 'Lena', phone: '0176-22 599 682', role: 'Trainerin' },
      { name: 'Marcel', phone: '0157-87 441 991', role: 'Trainer' },
      { name: 'Kay, Tufan, Jana', role: 'Trainerteam' }
    ]
  },

  // B-Jugend
  {
    id: 'b-jugend',
    category: 'B-Jugend',
    name: 'B-Jugend',
    shortName: 'B-Jugend',
    ageGroupCode: 'U16 / U17',
    birthYears: '2010 / 2011',
    minYear: 2010,
    maxYear: 2011,
    sessions: [
      { day: 'Mo', start: '18:15', end: '19:30', place: 'kunstrasen' },
      { day: 'Mi', start: '18:00', end: '19:30', place: 'kunstrasen' }
    ],
    fallback: [],
    fieldFormat: 'Großfeld 11 vs. 11',
    ballSize: 'Größe 5 (Normalball)',
    coaches: [
      { name: 'Dominik', phone: '0152-08 871 936', role: 'Cheftrainer' },
      { name: 'Joel, Ben, Vasilios', role: 'Trainerteam' }
    ]
  }
];

