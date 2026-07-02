import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

// SignInForm/SignUpForm call useRouter() for post-auth redirects. Outside of Next's
// actual App Router (i.e. in a unit test), that throws unless it's mocked.
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import ExperiencePage from "@/app/experience/page";
import ExpertisePage from "@/app/expertise/page";
import ServicesPage from "@/app/services/page";
import ContactPage from "@/app/contact/page";
import PrivacyPolicyPage from "@/app/privacy-policy/page";
import TermsOfServicePage from "@/app/terms-of-service/page";
import SchemaPage from "@/app/schema/page";
import SignInPage from "@/app/sign-in/page";
import SignUpPage from "@/app/sign-up/page";
import NotFound from "@/app/not-found";

expect.extend(toHaveNoViolations);

/**
 * jest-axe runs axe-core against jsdom's DOM, which doesn't do real layout/paint.
 * That makes the "color-contrast" rule unreliable here (jsdom can't resolve actual
 * rendered colors against real backgrounds) — it's disabled below to avoid false
 * positives/negatives. Everything else (landmarks, headings, labels, ARIA usage,
 * link/button names, etc.) is checked for real. Contrast should still be verified
 * with a real browser tool (Lighthouse, axe DevTools) before launch.
 */
const axeOptions = {
  rules: {
    "color-contrast": { enabled: false },
  },
};

const pages: Array<[string, () => JSX.Element]> = [
  ["Home", HomePage],
  ["About", AboutPage],
  ["Experience", ExperiencePage],
  ["Expertise", ExpertisePage],
  ["Services", ServicesPage],
  ["Contact", ContactPage],
  ["Privacy Policy", PrivacyPolicyPage],
  ["Terms of Service", TermsOfServicePage],
  ["Entity Schema", SchemaPage],
  ["Sign In", SignInPage],
  ["Sign Up", SignUpPage],
  ["404 Not Found", NotFound],
];

describe("Accessibility (axe)", () => {
  it.each(pages)("%s page has no detectable a11y violations", async (_name, Page) => {
    const { container } = render(<Page />);
    const results = await axe(container, axeOptions);
    expect(results).toHaveNoViolations();
  });
});
