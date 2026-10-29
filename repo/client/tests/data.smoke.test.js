// Data-map smoke: every marketing data module must load and export something,
// and the site map must keep its core lists populated. Catches a data edit
// that breaks a page's imports before the build does.
import { describe, it, expect } from 'vitest';

const dataModules = {
  site: () => import('../src/data/site.js'),
  images: () => import('../src/data/images.js'),
  blogPosts: () => import('../src/data/blogPosts.js'),
  caseStudies: () => import('../src/data/caseStudies.js'),
  commandcore: () => import('../src/data/commandcore.js'),
  marketingSuite: () => import('../src/data/marketingSuite.js'),
  fashionLifestyleSuite: () => import('../src/data/fashionLifestyleSuite.js'),
  industrialSuite: () => import('../src/data/industrialSuite.js'),
  secureOsSuite: () => import('../src/data/secureOsSuite.js'),
  careers: () => import('../src/data/careers.js'),
  industries: () => import('../src/data/industries.js'),
  compliance: () => import('../src/data/compliance.js'),
  data: () => import('../src/data/data.js'),
  marketingOsDeck: () => import('../src/data/marketingOsDeck.js'),
};

describe('data map smoke', () => {
  for (const [name, load] of Object.entries(dataModules)) {
    it(`${name}.js loads and exports bindings`, async () => {
      const mod = await load();
      expect(Object.keys(mod).length).toBeGreaterThan(0);
    });
  }

  it('site.js keeps non-empty team and advisors lists', async () => {
    const { team, advisors } = await import('../src/data/site.js');
    expect(Array.isArray(team)).toBe(true);
    expect(team.length).toBeGreaterThan(0);
    expect(Array.isArray(advisors)).toBe(true);
    expect(advisors.length).toBeGreaterThan(0);
  });

  it('case-study deep-link slugs are unique (URL contract)', async () => {
    const { caseIndex } = await import('../src/data/caseStudies.js');
    expect(caseIndex.length).toBeGreaterThan(0);
    const slugs = caseIndex.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((s) => /^[a-z0-9-]+$/.test(s))).toBe(true);
  });
});
