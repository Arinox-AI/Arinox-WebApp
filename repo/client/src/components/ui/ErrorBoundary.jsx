import { Component } from 'react';

/**
 * Wraps decorative widgets (WebGL/3D scenes) so a failure — e.g. WebGL
 * blocked by Brave Shields, disabled hardware acceleration, or a GPU
 * blocklist — degrades to "no animation" instead of blanking the page.
 */
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err) {
    console.warn('[ErrorBoundary] decorative widget disabled:', err?.message || err);
  }

  render() {
    return this.state.hasError ? (this.props.fallback ?? null) : this.props.children;
  }
}

export default ErrorBoundary;
