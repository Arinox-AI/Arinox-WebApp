// @vitest-environment jsdom
// Client module smoke: every page (and App) must import cleanly with a
// default export. Catches broken imports, bad paths, and module-init crashes
// that a production build would only surface later.
import { describe, it, expect } from 'vitest';

const pageModules = {
  App: () => import('../src/App.jsx'),
  Home: () => import('../src/pages/Home.jsx'),
  CommandCore: () => import('../src/pages/CommandCore.jsx'),
  CaseStudies: () => import('../src/pages/CaseStudies.jsx'),
  CaseStudyDetail: () => import('../src/pages/CaseStudyDetail.jsx'),
  Partners: () => import('../src/pages/Partners.jsx'),
  Blog: () => import('../src/pages/Blog.jsx'),
  BlogPost: () => import('../src/pages/BlogPost.jsx'),
  Careers: () => import('../src/pages/Careers.jsx'),
  Industries: () => import('../src/pages/Industries.jsx'),
  MarketingSuite: () => import('../src/pages/MarketingSuite.jsx'),
  ApparelSuite: () => import('../src/pages/ApparelSuite.jsx'),
  Contact: () => import('../src/pages/Contact.jsx'),
  Privacy: () => import('../src/pages/Privacy.jsx'),
  Terms: () => import('../src/pages/Terms.jsx'),
  NotFound: () => import('../src/pages/NotFound.jsx'),
};

describe('client module smoke', () => {
  for (const [name, load] of Object.entries(pageModules)) {
    it(`${name} imports with a default export`, async () => {
      const mod = await load();
      expect(mod.default).toBeDefined();
    });
  }
});
