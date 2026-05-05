import { describe, expect, it } from 'vitest';
import { mapPayload, type RawCompany } from './mappers';
import type { Company } from './types';

const MINIMAL_COMPANY: RawCompany = {
  siren: '443061841',
  nom_complet: 'GOOGLE FRANCE',
  nom_raison_sociale: 'GOOGLE FRANCE',
  sigle: null,
  nombre_etablissements: 15,
  nombre_etablissements_ouverts: 7,
  siege: null,
  activite_principale: '62.02A',
  categorie_entreprise: 'ETI',
  caractere_employeur: 'O',
  date_creation: '2002-05-16',
  date_fermeture: null,
  date_mise_a_jour: '2026-05-02T09:46:44',
  dirigeants: null,
  etat_administratif: 'A',
  nature_juridique: '5499',
  section_activite_principale: 'J',
  tranche_effectif_salarie: '42',
  matching_etablissements: null,
  finances: null,
  complements: null
};

const FULL_ESTABLISHMENT = {
  siret: '44306184100047',
  est_siege: true,
  adresse: '8 RUE DE LONDRES 75009 PARIS',
  code_postal: '75009',
  commune: '75109',
  libelle_commune: 'PARIS',
  latitude: '48.876958',
  longitude: '2.330008',
  activite_principale: '62.02A',
  etat_administratif: 'A',
  caractere_employeur: 'O',
  date_creation: '2011-05-13',
  date_fermeture: null,
  nom_commercial: 'Google',
  liste_enseignes: ['GOOGLE']
};

const PERSON_DIRECTOR = {
  type_dirigeant: 'personne physique',
  nom: 'DUPONT',
  prenoms: 'Jean',
  annee_de_naissance: '1975',
  qualite: 'Président',
  nationalite: 'Française',
  siren: null,
  denomination: null
};

const COMPANY_DIRECTOR = {
  type_dirigeant: 'personne morale',
  nom: null,
  prenoms: null,
  annee_de_naissance: null,
  qualite: 'Associé',
  nationalite: null,
  siren: '999888777',
  denomination: 'HOLDING SA'
};

const FULL_COMPLEMENTS = {
  est_bio: true,
  est_rge: false,
  est_qualiopi: true,
  est_ess: false,
  est_siae: false,
  est_association: false,
  est_entrepreneur_individuel: false,
  est_entrepreneur_spectacle: false,
  est_finess: false,
  est_organisme_formation: false,
  est_patrimoine_vivant: false,
  est_service_public: false,
  est_societe_mission: false,
  est_collectivite_territoriale: false,
  est_uai: false,
  est_l100_3: false,
  est_achats_responsables: false,
  est_alim_confiance: false,
  convention_collective_renseignee: false,
  egapro_renseignee: false,
  bilan_ges_renseigne: false,
  est_avocat: false,
  identifiant_association: null,
  statut_entrepreneur_spectacle: null,
  type_siae: null,
  liste_idcc: ['1486'],
  liste_id_organisme_formation: [],
  liste_finess_juridique: [],
  collectivite_territoriale: null
};

const firstCompany = (overrides: Partial<RawCompany> = {}): Company => {
  const result = mapPayload({
    results: [{ ...MINIMAL_COMPANY, ...overrides }],
    total_results: 1,
    page: 1,
    per_page: 10,
    total_pages: 1
  });
  const company = result.companies.at(0);
  if (!company) throw new Error('Expected a company');
  return company;
};

describe('mapPayload', () => {
  it('should map pagination fields', () => {
    const result = mapPayload({ results: [], total_results: 42, page: 2, per_page: 10, total_pages: 5 });

    expect(result.total).toBe(42);
    expect(result.page).toBe(2);
    expect(result.perPage).toBe(10);
    expect(result.totalPages).toBe(5);
    expect(result.companies).toEqual([]);
  });

  it('should map a minimal company', () => {
    const company = firstCompany();

    expect(company.siren).toBe('443061841');
    expect(company.fullName).toBe('GOOGLE FRANCE');
    expect(company.legalName).toBe('GOOGLE FRANCE');
    expect(company.status).toBe('active');
    expect(company.isEmployer).toBe(true);
    expect(company.headquarters).toBeNull();
    expect(company.directors).toEqual([]);
    expect(company.complements).toBeNull();
  });

  it('should map ceased company status', () => {
    expect(firstCompany({ etat_administratif: 'C' }).status).toBe('ceased');
  });

  it('should map headquarters establishment', () => {
    const hq = firstCompany({ siege: FULL_ESTABLISHMENT }).headquarters;

    expect(hq).not.toBeNull();
    expect(hq?.siret).toBe('44306184100047');
    expect(hq?.isHeadquarters).toBe(true);
    expect(hq?.address).toBe('8 RUE DE LONDRES 75009 PARIS');
    expect(hq?.postalCode).toBe('75009');
    expect(hq?.inseeCode).toBe('75109');
    expect(hq?.city).toBe('PARIS');
    expect(hq?.status).toBe('active');
    expect(hq?.tradeName).toBe('Google');
    expect(hq?.signs).toEqual(['GOOGLE']);
  });

  it('should map person director', () => {
    const director = firstCompany({ dirigeants: [PERSON_DIRECTOR] }).directors.at(0);

    expect(director).toBeDefined();
    expect(director?.type).toBe('person');
    if (director?.type === 'person') {
      expect(director.lastName).toBe('DUPONT');
      expect(director.firstNames).toBe('Jean');
      expect(director.birthYear).toBe(1975);
      expect(director.role).toBe('Président');
    }
  });

  it('should map company director', () => {
    const director = firstCompany({ dirigeants: [COMPANY_DIRECTOR] }).directors.at(0);

    expect(director).toBeDefined();
    expect(director?.type).toBe('company');
    if (director?.type === 'company') {
      expect(director.siren).toBe('999888777');
      expect(director.name).toBe('HOLDING SA');
      expect(director.role).toBe('Associé');
    }
  });

  it('should map finances', () => {
    const finances = firstCompany({ finances: { '2024': { ca: 1000000, resultat_net: 50000 } } }).finances;

    expect(finances.size).toBe(1);
    expect(finances.get(2024)).toEqual({ revenue: 1000000, netResult: 50000 });
  });

  it('should map complements with labels', () => {
    const complements = firstCompany({ complements: FULL_COMPLEMENTS }).complements;

    expect(complements).not.toBeNull();
    expect(complements?.labels).toEqual(new Set(['bio', 'qualiopi']));
    expect(complements?.collectiveAgreements).toEqual(['1486']);
  });

  it('should default legalName to empty string when null', () => {
    expect(firstCompany({ nom_raison_sociale: null }).legalName).toBe('');
  });

  it('should default null director fields to empty values', () => {
    const director = firstCompany({
      dirigeants: [{ ...PERSON_DIRECTOR, nom: null, prenoms: null, annee_de_naissance: null, nationalite: null }]
    }).directors.at(0);

    expect(director?.type).toBe('person');
    if (director?.type === 'person') {
      expect(director.lastName).toBe('');
      expect(director.firstNames).toBe('');
      expect(director.birthYear).toBe(0);
      expect(director.nationality).toBe('');
    }
  });

  it('should default null establishment coordinates to 0', () => {
    const hq = firstCompany({
      siege: { ...FULL_ESTABLISHMENT, latitude: null, longitude: null, adresse: null, libelle_commune: null }
    }).headquarters;

    expect(hq?.latitude).toBe(0);
    expect(hq?.longitude).toBe(0);
    expect(hq?.address).toBe('');
    expect(hq?.city).toBe('');
  });

  it('should map matching establishments', () => {
    const company = firstCompany({ matching_etablissements: [FULL_ESTABLISHMENT] });

    expect(company.matchingEstablishments).toHaveLength(1);
    expect(company.matchingEstablishments.at(0)?.siret).toBe('44306184100047');
  });

  it('should map complements with local authority and elected officials', () => {
    const complements = firstCompany({
      complements: {
        ...FULL_COMPLEMENTS,
        collectivite_territoriale: {
          code: '75C',
          code_insee: '75056',
          niveau: 'commune',
          elus: [{ nom: 'HIDALGO', prenoms: 'Anne', annee_de_naissance: '1959', fonction: 'Maire', sexe: 'F' }]
        }
      }
    }).complements;

    expect(complements?.localAuthority).not.toBeNull();
    expect(complements?.localAuthority?.code).toBe('75C');
    expect(complements?.localAuthority?.inseeCode).toBe('75056');
    expect(complements?.localAuthority?.level).toBe('commune');

    const official = complements?.localAuthority?.electedOfficials.at(0);
    expect(official?.lastName).toBe('HIDALGO');
    expect(official?.firstNames).toBe('Anne');
    expect(official?.birthYear).toBe(1959);
    expect(official?.role).toBe('Maire');
    expect(official?.gender).toBe('F');
  });
});
