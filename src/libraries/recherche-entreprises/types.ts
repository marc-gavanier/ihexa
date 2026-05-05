export type CompanySummary = {
  readonly companyName: string;
  readonly legalForm: string;
  readonly siren: string;
  readonly siret: string;
  readonly street: string;
  readonly zipcode: string;
  readonly city: string;
  readonly inseeCode: string;
};

export type SearchResult = {
  companies: Company[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type Company = {
  siren: string;
  fullName: string;
  legalName: string;
  acronym: string | null;
  establishmentCount: number;
  openEstablishmentCount: number;
  headquarters: Establishment | null;
  mainActivity: string;
  category: string;
  isEmployer: boolean;
  createdAt: Date;
  closedAt: Date | null;
  updatedAt: Date;
  directors: Director[];
  status: 'active' | 'ceased';
  legalForm: string;
  activitySection: string;
  employeeBracket: string;
  matchingEstablishments: Establishment[];
  finances: Map<number, Finance>;
  complements: Complements | null;
};

export type Establishment = {
  siret: string;
  isHeadquarters: boolean;
  address: string;
  postalCode: string | null;
  inseeCode: string | null;
  city: string;
  latitude: number;
  longitude: number;
  mainActivity: string;
  status: 'active' | 'ceased';
  isEmployer: boolean;
  createdAt: Date | null;
  closedAt: Date | null;
  tradeName: string | null;
  signs: string[];
};

export type Finance = {
  revenue: number;
  netResult: number;
};

export type Director =
  | {
      type: 'person';
      lastName: string;
      firstNames: string;
      birthYear: number;
      role: string;
      nationality: string;
    }
  | {
      type: 'company';
      siren: string;
      name: string;
      role: string;
    };

export type Complements = {
  labels: Set<Label>;
  associationId: string | null;
  showBusinessStatus: string | null;
  siaeType: string | null;
  collectiveAgreements: string[];
  trainingOrganizationIds: string[];
  legalFinessIds: string[];
  localAuthority: LocalAuthority | null;
};

export type LocalAuthority = {
  code: string;
  inseeCode: string;
  level: string;
  electedOfficials: ElectedOfficial[];
};

export type ElectedOfficial = {
  lastName: string;
  firstNames: string;
  birthYear: number;
  role: string;
  gender: string;
};

export type Label =
  | 'bio'
  | 'rge'
  | 'qualiopi'
  | 'ess'
  | 'siae'
  | 'association'
  | 'entrepreneurIndividuel'
  | 'entrepreneurSpectacle'
  | 'finess'
  | 'organismeFormation'
  | 'patrimoineVivant'
  | 'servicePublic'
  | 'societeMission'
  | 'collectiviteTerritoriale'
  | 'uai'
  | 'l100_3'
  | 'achatsResponsables'
  | 'alimConfiance'
  | 'conventionCollective'
  | 'egapro'
  | 'bilanGes'
  | 'avocat';

export type IncludeField = 'directors' | 'finances' | 'complements' | 'matchingEstablishments' | 'headquarters' | 'score';

export type LocationFilter = {
  postalCode?: string | string[];
  commune?: string | string[];
  department?: string | string[];
  region?: string | string[];
  epci?: string | string[];
};

export type Filters = {
  activity?: string | string[];
  activitySection?: string | string[];
  legalForm?: string | string[];
  category?: 'PME' | 'ETI' | 'GE';
  status?: 'active' | 'ceased';
  employeeBracket?: string | string[];
  person?: PersonFilter;
  revenue?: RangeFilter;
  netResult?: RangeFilter;
  conventionCollectiveId?: string;
  finessId?: string;
  rgeId?: string;
  uaiId?: string;
  sortBySize?: boolean;
};

export type PersonFilter = {
  name?: string;
  firstNames?: string;
  birthDateMin?: Date;
  birthDateMax?: Date;
  type?: 'director' | 'electedOfficial';
};

export type RangeFilter = {
  min?: number;
  max?: number;
};
