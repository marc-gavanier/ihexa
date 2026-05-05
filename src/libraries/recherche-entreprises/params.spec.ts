import { describe, expect, it } from 'vitest';
import { withPagination } from './http';
import { applyFilters, applyInclude, applyLabels, applyLocation, buildUrl } from './params';

describe('buildUrl', () => {
  it('should build url with base and path', () => {
    expect(buildUrl('/search', new Map())).toBe('https://recherche-entreprises.api.gouv.fr/search');
  });

  it('should append params as query string', () => {
    const params = new Map([
      ['q', 'google'],
      ['page', '1']
    ]);
    expect(buildUrl('/search', params)).toBe('https://recherche-entreprises.api.gouv.fr/search?q=google&page=1');
  });
});

describe('applyLabels', () => {
  it('should set label params to true', () => {
    const params = new Map<string, string>();
    applyLabels(params, ['bio', 'rge']);

    expect(params.get('est_bio')).toBe('true');
    expect(params.get('est_rge')).toBe('true');
  });

  it('should handle empty labels', () => {
    const params = new Map<string, string>();
    applyLabels(params, []);

    expect(params.size).toBe(0);
  });
});

describe('applyInclude', () => {
  it('should set minimal and include params', () => {
    const params = new Map<string, string>();
    applyInclude(params, ['directors', 'finances']);

    expect(params.get('minimal')).toBe('true');
    expect(params.get('include')).toBe('dirigeants,finances');
  });

  it('should not set any params for empty fields', () => {
    const params = new Map<string, string>();
    applyInclude(params, []);

    expect(params.size).toBe(0);
  });
});

describe('applyLocation', () => {
  it('should set location params', () => {
    const params = new Map<string, string>();
    applyLocation(params, { postalCode: '75009', department: '75' });

    expect(params.get('code_postal')).toBe('75009');
    expect(params.get('departement')).toBe('75');
  });

  it('should join arrays with commas', () => {
    const params = new Map<string, string>();
    applyLocation(params, { postalCode: ['75009', '75010'] });

    expect(params.get('code_postal')).toBe('75009,75010');
  });

  it('should skip undefined fields', () => {
    const params = new Map<string, string>();
    applyLocation(params, {});

    expect(params.size).toBe(0);
  });
});

describe('applyFilters', () => {
  it('should set simple filter params', () => {
    const params = new Map<string, string>();
    applyFilters(params, { activity: '62.02A', category: 'PME' });

    expect(params.get('activite_principale')).toBe('62.02A');
    expect(params.get('categorie_entreprise')).toBe('PME');
  });

  it('should map status to API values', () => {
    const params = new Map<string, string>();
    applyFilters(params, { status: 'active' });
    expect(params.get('etat_administratif')).toBe('A');

    const params2 = new Map<string, string>();
    applyFilters(params2, { status: 'ceased' });
    expect(params2.get('etat_administratif')).toBe('C');
  });

  it('should set person filter params', () => {
    const params = new Map<string, string>();
    applyFilters(params, {
      person: {
        name: 'Dupont',
        firstNames: 'Jean',
        birthDateMin: new Date('1980-01-15'),
        type: 'director'
      }
    });

    expect(params.get('nom_personne')).toBe('Dupont');
    expect(params.get('prenoms_personne')).toBe('Jean');
    expect(params.get('date_naissance_personne_min')).toBe('1980-01-15');
    expect(params.get('type_personne')).toBe('dirigeant');
  });

  it('should map electedOfficial type', () => {
    const params = new Map<string, string>();
    applyFilters(params, { person: { type: 'electedOfficial' } });

    expect(params.get('type_personne')).toBe('elu');
  });

  it('should set revenue range params', () => {
    const params = new Map<string, string>();
    applyFilters(params, { revenue: { min: 1000, max: 5000 } });

    expect(params.get('ca_min')).toBe('1000');
    expect(params.get('ca_max')).toBe('5000');
  });

  it('should set net result range params', () => {
    const params = new Map<string, string>();
    applyFilters(params, { netResult: { min: 0 } });

    expect(params.get('resultat_net_min')).toBe('0');
    expect(params.has('resultat_net_max')).toBe(false);
  });

  it('should set sortBySize param when true', () => {
    const params = new Map<string, string>();
    applyFilters(params, { sortBySize: true });

    expect(params.get('sort_by_size')).toBe('true');
  });

  it('should not set sortBySize param when false', () => {
    const params = new Map<string, string>();
    applyFilters(params, { sortBySize: false });

    expect(params.has('sort_by_size')).toBe(false);
  });

  it('should skip undefined filters', () => {
    const params = new Map<string, string>();
    applyFilters(params, {});

    expect(params.size).toBe(0);
  });
});

describe('withPagination', () => {
  it('should set page param', () => {
    const params = new Map<string, string>();
    withPagination(params, 3);

    expect(params.get('page')).toBe('3');
    expect(params.has('per_page')).toBe(false);
  });

  it('should set page and perPage params', () => {
    const params = new Map<string, string>();
    withPagination(params, 2, 25);

    expect(params.get('page')).toBe('2');
    expect(params.get('per_page')).toBe('25');
  });
});
