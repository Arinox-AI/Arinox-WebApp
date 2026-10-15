// Client test environment stubs. Vitest loads this for every suite; the
// typeof guards make it a no-op for the node-env server suites. jsdom lacks
// these browser APIs that framer-motion and the site components expect.
if (typeof window !== 'undefined') {
  // jsdom has no matchMedia. Report reduced-motion so framer-motion skips
  // animations - renders stay synchronous and deterministic.
  window.matchMedia = window.matchMedia || ((query) => ({
    matches: /prefers-reduced-motion/.test(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));

  if (!window.ResizeObserver) {
    window.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return []; }
    };
  }

  // jsdom logs "Not implemented" noise for these; make them no-ops.
  window.scrollTo = () => {};
  if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
}

// jsdom has no 2D canvas; AsciiGlobe only uses it to measure monospace text.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = function getContext() {
    return {
      font: '',
      measureText: (text) => ({ width: String(text).length * 8 }),
    };
  };
}
