import type { Filters, IncludeField, Label, LocationFilter, RangeFilter } from './types';

const BASE_URL = 'https://recherche-entreprises.api.gouv.fr';

const LABEL_TO_PARAM: Record<Label, string> = {
  bio: 'est_bio',
  rge: 'est_rge',
  qualiopi: 'est_qualiopi',
  ess: 'est_ess',
  siae: 'est_siae',
  association: 'est_association',
  entrepreneurIndividuel: 'est_entrepreneur_individuel',
  entrepreneurSpectacle: 'est_entrepreneur_spectacle',
  finess: 'est_finess',
  organismeFormation: 'est_organisme_formation',
  patrimoineVivant: 'est_patrimoine_vivant',
  servicePublic: 'est_service_public',
  societeMission: 'est_societe_mission',
  collectiviteTerritoriale: 'est_collectivite_territoriale',
  uai: 'est_uai',
  l100_3: 'est_l100_3',
  achatsResponsables: 'est_achats_responsables',
  alimConfiance: 'est_alim_confiance',
  conventionCollective: 'convention_collective_renseignee',
  egapro: 'egapro_renseignee',
  bilanGes: 'bilan_ges_renseigne',
  avocat: 'est_avocat'
};

const INCLUDE_TO_PARAM: Record<IncludeField, string> = {
  directors: 'dirigeants',
  finances: 'finances',
  complements: 'complements',
  matchingEstablishments: 'matching_etablissements',
  headquarters: 'siege',
  score: 'score'
};

const toCommaSeparated = (value: unknown): string => (Array.isArray(value) ? value.join(',') : String(value));

const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

type ParamApplicator<T> = (params: Map<string, string>, source: T) => void;

const setParam = (params: Map<string, string>, key: string, value: string | number | null | undefined): void => {
  if (value != null) params.set(key, String(value));
};

const mapped =
  <T>(mappings: readonly [keyof T & string, string, ((v: T[keyof T]) => string)?][]): ParamApplicator<T> =>
  (params, source) =>
    mappings
      .filter(([key]) => source[key] != null)
      .forEach(([key, param, transform]) => {
        params.set(param, transform ? transform(source[key]) : String(source[key]));
      });

const when =
  <T>(predicate: (source: T) => boolean, apply: ParamApplicator<T>): ParamApplicator<T> =>
  (params, source) => {
    if (predicate(source)) apply(params, source);
  };

const compose =
  <T>(...applicators: ParamApplicator<T>[]): ParamApplicator<T> =>
  (params, source) => {
    applicators.forEach((apply) => {
      apply(params, source);
    });
  };

export const buildUrl = (path: string, params: Map<string, string>): string =>
  [...params].reduce((url, [key, value]) => {
    url.searchParams.set(key, value);
    return url;
  }, new URL(path, BASE_URL)).href;

export const applyLabels = (params: Map<string, string>, labels: Label[]): void => {
  labels.forEach((label) => {
    params.set(LABEL_TO_PARAM[label], 'true');
  });
};

export const applyInclude = (params: Map<string, string>, fields: IncludeField[]): void => {
  if (fields.length === 0) return;
  params.set('minimal', 'true');
  params.set('include', fields.map((f) => INCLUDE_TO_PARAM[f]).join(','));
};

export const applyLocation: ParamApplicator<LocationFilter> = mapped<LocationFilter>([
  ['postalCode', 'code_postal', toCommaSeparated],
  ['commune', 'code_commune', toCommaSeparated],
  ['department', 'departement', toCommaSeparated],
  ['region', 'region', toCommaSeparated],
  ['epci', 'epci', toCommaSeparated]
]);

const applySimpleFilters = mapped<Filters>([
  ['activity', 'activite_principale', toCommaSeparated],
  ['activitySection', 'section_activite_principale', toCommaSeparated],
  ['legalForm', 'nature_juridique', toCommaSeparated],
  ['category', 'categorie_entreprise'],
  ['employeeBracket', 'tranche_effectif_salarie', toCommaSeparated],
  ['conventionCollectiveId', 'id_convention_collective'],
  ['finessId', 'id_finess'],
  ['rgeId', 'id_rge'],
  ['uaiId', 'id_uai']
]);

const STATUS_TO_PARAM: Record<string, string> = { active: 'A', ceased: 'C' };

const applyStatus: ParamApplicator<Filters> = (params, { status }) =>
  setParam(params, 'etat_administratif', status ? STATUS_TO_PARAM[status] : null);

const applySortBySize: ParamApplicator<Filters> = when(
  (f) => f.sortBySize === true,
  (params) => params.set('sort_by_size', 'true')
);

const PERSON_TYPE_TO_PARAM: Record<string, string> = { director: 'dirigeant', electedOfficial: 'elu' };

const applyPerson: ParamApplicator<Filters> = (params, { person }) => {
  if (!person) return;
  setParam(params, 'nom_personne', person.name);
  setParam(params, 'prenoms_personne', person.firstNames);
  setParam(params, 'date_naissance_personne_min', person.birthDateMin ? formatDate(person.birthDateMin) : null);
  setParam(params, 'date_naissance_personne_max', person.birthDateMax ? formatDate(person.birthDateMax) : null);
  setParam(params, 'type_personne', person.type ? PERSON_TYPE_TO_PARAM[person.type] : null);
};

const applyRange =
  (extract: (filters: Filters) => RangeFilter | undefined, minParam: string, maxParam: string): ParamApplicator<Filters> =>
  (params, filters) => {
    const range = extract(filters);
    if (!range) return;
    setParam(params, minParam, range.min);
    setParam(params, maxParam, range.max);
  };

export const applyFilters: ParamApplicator<Filters> = compose(
  applySimpleFilters,
  applyStatus,
  applySortBySize,
  applyPerson,
  applyRange((f) => f.revenue, 'ca_min', 'ca_max'),
  applyRange((f) => f.netResult, 'resultat_net_min', 'resultat_net_max')
);
