import type {
  Company,
  Complements,
  Director,
  ElectedOfficial,
  Establishment,
  Finance,
  Label,
  LocalAuthority,
  SearchResult
} from './types';

type RawPayload = {
  results: RawCompany[];
  total_results: number;
  page: number;
  per_page: number;
  total_pages: number;
};

export type RawCompany = {
  siren: string;
  nom_complet: string;
  nom_raison_sociale: string | null;
  sigle: string | null;
  nombre_etablissements: number;
  nombre_etablissements_ouverts: number;
  siege: RawEstablishment | null;
  activite_principale: string | null;
  categorie_entreprise: string | null;
  caractere_employeur: string | null;
  date_creation: string;
  date_fermeture: string | null;
  date_mise_a_jour: string;
  dirigeants: RawDirector[] | null;
  etat_administratif: string;
  nature_juridique: string | null;
  section_activite_principale: string | null;
  tranche_effectif_salarie: string | null;
  matching_etablissements: RawEstablishment[] | null;
  finances: Record<string, RawFinanceEntry> | null;
  complements: RawComplements | null;
};

type RawEstablishment = {
  siret: string;
  est_siege: boolean;
  adresse: string | null;
  code_postal: string | null;
  commune: string | null;
  libelle_commune: string | null;
  latitude: string | null;
  longitude: string | null;
  activite_principale: string | null;
  etat_administratif: string;
  caractere_employeur: string | null;
  date_creation: string | null;
  date_fermeture: string | null;
  nom_commercial: string | null;
  liste_enseignes: string[] | null;
};

type RawDirector = {
  type_dirigeant: string;
  nom: string | null;
  prenoms: string | null;
  annee_de_naissance: string | null;
  qualite: string | null;
  nationalite: string | null;
  siren: string | null;
  denomination: string | null;
};

type RawFinanceEntry = {
  ca: number;
  resultat_net: number;
};

type RawComplements = {
  est_bio: boolean;
  est_rge: boolean;
  est_qualiopi: boolean;
  est_ess: boolean;
  est_siae: boolean;
  est_association: boolean;
  est_entrepreneur_individuel: boolean;
  est_entrepreneur_spectacle: boolean;
  est_finess: boolean;
  est_organisme_formation: boolean;
  est_patrimoine_vivant: boolean;
  est_service_public: boolean;
  est_societe_mission: boolean;
  est_collectivite_territoriale: boolean;
  est_uai: boolean;
  est_l100_3: boolean;
  est_achats_responsables: boolean;
  est_alim_confiance: boolean;
  convention_collective_renseignee: boolean;
  egapro_renseignee: boolean;
  bilan_ges_renseigne: boolean;
  est_avocat: boolean;
  identifiant_association: string | null;
  statut_entrepreneur_spectacle: string | null;
  type_siae: string | null;
  liste_idcc: string[];
  liste_id_organisme_formation: string[];
  liste_finess_juridique: string[];
  collectivite_territoriale: RawLocalAuthority | null;
};

type RawLocalAuthority = {
  code: string;
  code_insee: string;
  niveau: string;
  elus: RawElectedOfficial[];
};

type RawElectedOfficial = {
  nom: string;
  prenoms: string;
  annee_de_naissance: string;
  fonction: string;
  sexe: string;
};

const COMPLEMENT_LABELS: [keyof RawComplements, Label][] = [
  ['est_bio', 'bio'],
  ['est_rge', 'rge'],
  ['est_qualiopi', 'qualiopi'],
  ['est_ess', 'ess'],
  ['est_siae', 'siae'],
  ['est_association', 'association'],
  ['est_entrepreneur_individuel', 'entrepreneurIndividuel'],
  ['est_entrepreneur_spectacle', 'entrepreneurSpectacle'],
  ['est_finess', 'finess'],
  ['est_organisme_formation', 'organismeFormation'],
  ['est_patrimoine_vivant', 'patrimoineVivant'],
  ['est_service_public', 'servicePublic'],
  ['est_societe_mission', 'societeMission'],
  ['est_collectivite_territoriale', 'collectiviteTerritoriale'],
  ['est_uai', 'uai'],
  ['est_l100_3', 'l100_3'],
  ['est_achats_responsables', 'achatsResponsables'],
  ['est_alim_confiance', 'alimConfiance'],
  ['convention_collective_renseignee', 'conventionCollective'],
  ['egapro_renseignee', 'egapro'],
  ['bilan_ges_renseigne', 'bilanGes'],
  ['est_avocat', 'avocat']
];

const mapElectedOfficial = (raw: RawElectedOfficial): ElectedOfficial => ({
  lastName: raw.nom,
  firstNames: raw.prenoms,
  birthYear: parseInt(raw.annee_de_naissance, 10),
  role: raw.fonction,
  gender: raw.sexe
});

const mapLocalAuthority = (raw: RawLocalAuthority): LocalAuthority => ({
  code: raw.code,
  inseeCode: raw.code_insee,
  level: raw.niveau,
  electedOfficials: raw.elus.map(mapElectedOfficial)
});

const mapComplements = (raw: RawComplements): Complements => ({
  labels: new Set(COMPLEMENT_LABELS.filter(([key]) => raw[key] === true).map(([, label]) => label)),
  associationId: raw.identifiant_association,
  showBusinessStatus: raw.statut_entrepreneur_spectacle,
  siaeType: raw.type_siae,
  collectiveAgreements: raw.liste_idcc,
  trainingOrganizationIds: raw.liste_id_organisme_formation,
  legalFinessIds: raw.liste_finess_juridique,
  localAuthority: raw.collectivite_territoriale ? mapLocalAuthority(raw.collectivite_territoriale) : null
});

const mapFinances = (raw: Record<string, RawFinanceEntry>): Map<number, Finance> =>
  Object.entries(raw).reduce((map, [year, entry]) => {
    const yearNum = parseInt(year, 10);
    if (!Number.isNaN(yearNum) && entry != null) {
      map.set(yearNum, { revenue: entry.ca, netResult: entry.resultat_net });
    }
    return map;
  }, new Map<number, Finance>());

const mapDirector = (raw: RawDirector): Director =>
  raw.type_dirigeant === 'personne physique'
    ? {
        type: 'person',
        lastName: raw.nom ?? '',
        firstNames: raw.prenoms ?? '',
        birthYear: parseInt(raw.annee_de_naissance ?? '0', 10),
        role: raw.qualite ?? '',
        nationality: raw.nationalite ?? ''
      }
    : {
        type: 'company',
        siren: raw.siren ?? '',
        name: raw.denomination ?? '',
        role: raw.qualite ?? ''
      };

const mapEstablishment = (raw: RawEstablishment): Establishment => ({
  siret: raw.siret,
  isHeadquarters: raw.est_siege,
  address: raw.adresse ?? '',
  postalCode: raw.code_postal,
  inseeCode: raw.commune,
  city: raw.libelle_commune ?? '',
  latitude: parseFloat(raw.latitude ?? '0'),
  longitude: parseFloat(raw.longitude ?? '0'),
  mainActivity: raw.activite_principale ?? '',
  status: raw.etat_administratif === 'A' ? 'active' : 'ceased',
  isEmployer: raw.caractere_employeur === 'O',
  createdAt: raw.date_creation ? new Date(raw.date_creation) : null,
  closedAt: raw.date_fermeture ? new Date(raw.date_fermeture) : null,
  tradeName: raw.nom_commercial,
  signs: raw.liste_enseignes ?? []
});

const mapCompany = (raw: RawCompany): Company => ({
  siren: raw.siren,
  fullName: raw.nom_complet,
  legalName: raw.nom_raison_sociale ?? '',
  acronym: raw.sigle,
  establishmentCount: raw.nombre_etablissements,
  openEstablishmentCount: raw.nombre_etablissements_ouverts,
  headquarters: raw.siege ? mapEstablishment(raw.siege) : null,
  mainActivity: raw.activite_principale ?? '',
  category: raw.categorie_entreprise ?? '',
  isEmployer: raw.caractere_employeur === 'O',
  createdAt: new Date(raw.date_creation),
  closedAt: raw.date_fermeture ? new Date(raw.date_fermeture) : null,
  updatedAt: new Date(raw.date_mise_a_jour),
  directors: raw.dirigeants ? raw.dirigeants.map(mapDirector) : [],
  status: raw.etat_administratif === 'A' ? 'active' : 'ceased',
  legalForm: raw.nature_juridique ?? '',
  activitySection: raw.section_activite_principale ?? '',
  employeeBracket: raw.tranche_effectif_salarie ?? '',
  matchingEstablishments: raw.matching_etablissements ? raw.matching_etablissements.map(mapEstablishment) : [],
  finances: raw.finances ? mapFinances(raw.finances) : new Map(),
  complements: raw.complements ? mapComplements(raw.complements) : null
});

export const mapPayload = (raw: RawPayload): SearchResult => ({
  companies: raw.results.map(mapCompany),
  total: raw.total_results,
  page: raw.page,
  perPage: raw.per_page,
  totalPages: raw.total_pages
});
