import "@testing-library/jest-dom";

// jsdom doesn't implement TextEncoder/TextDecoder. The qrcode library (used
// to generate the contact page's vCard QR code) needs it even for server-side
// SVG string generation.
import { TextEncoder, TextDecoder } from "util";

if (!globalThis.TextEncoder) {
  Object.assign(globalThis, { TextEncoder, TextDecoder });
}

// jsdom (Jest's default DOM test environment) doesn't implement the Fetch API by
// design. whatwg-fetch polyfills it on top of jsdom's existing XMLHttpRequest
// support, which — unlike undici's fetch — doesn't require Web Streams globals
// jsdom lacks (ReadableStream, etc.), so it's a much better fit for this environment.
import "whatwg-fetch";

// jsdom also doesn't implement IntersectionObserver. next/link uses it internally
// to decide when to prefetch a link that's scrolled into view — without a stub
// here, that internal state update fires outside of React's test `act()` wrapper
// and spams warnings unrelated to real accessibility or behavior issues.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver;

// jsdom also doesn't implement scrolling (it does no real layout), so
// Element.prototype.scrollTo doesn't exist. ChatWidget calls it to auto-scroll
// the message list — harmless no-op here, real behavior in an actual browser.
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {};
}
