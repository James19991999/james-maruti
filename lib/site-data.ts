export const siteConfig = {
  name: "James Maruti",
  title: "James Maruti | Next.js Developer & UI Architect — Nairobi, Kenya",
  description:
    "James Maruti is a Nairobi-based UI architect and Next.js developer building scalable web systems, psychological UX design, and entity-first technical SEO for high-growth ventures.",
  url: "https://jamesmaruti.site",
  email: "jamesmaruti560@gmail.com",
  location: "Nairobi, Kenya",
  linkedin: "https://linkedin.com/in/james-maruti-a6738231a",
  github: "https://github.com/James19991999",
  cvUrl: "/documents/james-maruti-cv.pdf",
};

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "UI Architect & Digital Strategist",
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  image: `${siteConfig.url}/images/jymoo.jpg`,
  sameAs: [siteConfig.linkedin, siteConfig.github],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Moi University",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "UI/UX Design",
    "Media Psychology",
    "Technical SEO",
    "Entity-First SEO",
    "Web Development",
    "Nairobi Kenya",
  ],
};

export const mainNavLinks = [
  { label: "Expertise", href: "/expertise" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
];

export const expertiseDomains = [
  {
    icon: "terminal",
    title: "Scalable Systems",
    description:
      "Enterprise-grade application architecture using high-performance modern stacks.",
    tags: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    accent: "primary" as const,
  },
  {
    icon: "psychology",
    title: "Media Psychology & UI/UX",
    description:
      "Cognitive design strategies that reduce friction and turn passive users into brand advocates.",
    tags: ["Cognitive Bias", "UX Audit", "Figma"],
    accent: "secondary" as const,
  },
  {
    icon: "database",
    title: "Entity-First SEO",
    description:
      "Moving beyond keywords to semantic indexing, Schema optimization, and organic growth.",
    tags: ["Schema.org", "Vitals", "Strategy"],
    accent: "tertiary" as const,
  },
];

export const featuredProjects = [
  {
    title: "JG Creative Tech Solution",
    category: "Agency & Portfolio Platform",
    description: "A high-performance platform for digital innovation.",
    tags: ["Agency", "Webflow"],
    href: "https://jgcreativetechsolution.org",
    external: true,
  },
  {
    title: "LocateSafe",
    category: "Real-Time Tracking Platform",
    description: "School bus fleet tracking app built for student transportation safety.",
    tags: ["SaaS", "Real-Time"],
    href: "https://locatesafe-prody.vercel.app",
    external: true,
  },
  {
    title: "EduConnect",
    category: "Multi-Tenant School Management Portal",
    description:
      "School management interface. Streamlined workflows for modern educational institutions.",
    tags: ["Education", "SaaS"],
    href: "https://edu-connect-prod-six.vercel.app",
    external: true,
  },
  {
    title: "PULSE",
    category: "Fitness Tracker SaaS",
    description: "Built with Next.js and Stripe for performance-driven data and monetization.",
    tags: ["Web App", "SaaS"],
    href: "",
    external: false,
    comingSoon: true,
  },
  {
    title: "James Maruti Portfolio",
    category: "Personal Brand Site",
    description: "Personal brand site. The very ecosystem you are exploring right now.",
    tags: ["Portfolio", "Next.js"],
    href: siteConfig.url,
    external: true,
  },
];

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en-US",
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "UI Architect & Digital Strategist",
      email: siteConfig.email,
      address: personSchema.address,
      image: personSchema.image,
      sameAs: personSchema.sameAs,
      alumniOf: personSchema.alumniOf,
      knowsAbout: personSchema.knowsAbout,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#services`,
      name: `${siteConfig.name} — Web Architecture & Digital Strategy`,
      url: `${siteConfig.url}/services`,
      description:
        "Scalable Next.js development, psychological UI/UX design, and entity-first technical SEO.",
      provider: { "@id": personId },
      areaServed: {
        "@type": "Country",
        name: "Kenya",
      },
      serviceType: [
        "Web Development",
        "UI/UX Design",
        "Technical SEO",
        "Next.js Development",
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/#projects`,
      name: "Featured Projects by James Maruti",
      itemListElement: featuredProjects
        .filter((project) => !project.comingSoon && project.href)
        .map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: project.href,
            author: { "@id": personId },
          },
        })),
    },
  ],
};

export const impactHistory = [
  {
    date: "Nov 2025 — Present",
    org: "JG Creative Tech Solution",
    role: "Website & Graphic Designer",
    description:
      "Driving high-performance digital solutions with focus on Webflow and WordPress performance optimization. Managing enterprise SEO visibility and technical asset creation.",
  },
  {
    date: "Feb 2025 — Nov 2025",
    org: "JayGraphics Family",
    role: "Freelance Designer",
    description:
      "Delivered 60+ high-fidelity brand assets across various industries, maintaining a 95% client satisfaction rate through meticulous attention to brand psychology.",
  },
  {
    date: "May 2024 — Dec 2024",
    org: "Phloem Media",
    role: "Graphic Design Apprenticeship",
    description:
      "Focused on production workflows and cross-platform visual consistency in a fast-paced agency environment.",
  },
  {
    date: "Past Engagement",
    org: "Koitaleel Samoei University",
    role: "Marketing & PR Intern",
    description:
      "Bridged the gap between institutional messaging and digital engagement through strategic communication.",
  },
];

export const experienceEntries = [
  {
    org: "JG Creative Tech Solution",
    date: "Nov 2025 - Present",
    icon: "terminal",
    role: "Website/Graphic Designer",
    stats: [
      { icon: "speed", value: "40%", label: "Webflow/WordPress Speed Improvement" },
      { icon: "trending_up", value: "25%", label: "Technical SEO Visibility Increase" },
    ],
  },
  {
    org: "JayGraphics Family",
    date: "Feb 2025 - Nov 2025",
    icon: "draw",
    role: "Freelance Designer",
    stats: [
      { icon: "", value: "60+", label: "Custom Assets" },
      { icon: "", value: "95%", label: "Satisfaction" },
      { icon: "", value: "10+", label: "Business Brandings" },
    ],
  },
  {
    org: "Phloem Media",
    date: "May 2024 - Dec 2024",
    icon: "school",
    role: "Graphic Design Apprenticeship",
    stats: [
      { icon: "", value: "10+", label: "custom visuals delivered" },
      { icon: "", value: "", label: "UI/UX issue resolution & testing" },
    ],
  },
  {
    org: "Koitaleel Samoei University",
    date: "Sep 2022 - Apr 2023",
    icon: "campaign",
    role: "Marketing & PR Intern",
    stats: [
      { icon: "", value: "10%", label: "Engagement Boost" },
      { icon: "", value: "300+", label: "Event Coordination Attendees" },
    ],
  },
];

export const almaMater = {
  org: "Moi University",
  date: "Sep 2019 - Dec 2023",
  degree: "Bachelor of Arts in Linguistics, Media and Communication.",
  note: "Foundation for media psychology and structured communication in digital architecture.",
};

export const foundationalValues = [
  {
    number: "01.",
    title: "Technical Integrity",
    description:
      "Precision in every line of code. From strict TypeScript definitions to optimized build pipelines, I believe durability is the ultimate form of sustainability.",
  },
  {
    number: "02.",
    title: "Cognitive Empathy",
    description:
      "Understanding the 'Why' before the 'How'. I build for the human on the other side of the screen, ensuring every interaction feels intuitive and earned.",
  },
  {
    number: "03.",
    title: "Scalable Growth",
    description:
      "Systems designed for evolution. I architect solutions that don't just solve today's problems but provide the framework for tomorrow's innovations.",
  },
];

export const philosophyPillars = [
  { icon: "psychology", title: "Cognitive Load", description: "Optimizing UI for the brain's processing limits." },
  { icon: "terminal", title: "Clean Syntax", description: "Type-safe, scalable Next.js foundations." },
  { icon: "search", title: "SEO Entity", description: "Semantic structures that search engines crave." },
  { icon: "hub", title: "Systematic Design", description: "Atomic principles for long-term growth." },
];

export const journeyMilestones = [
  {
    date: "2016 — 2020",
    org: "Moi University",
    title: "Bachelor of Arts: Linguistics, Media & Communication",
    description:
      "This is where the foundation was laid. Studying the structure of human language and the psychology of mass media provided a unique lens for my future in technology. I learned how information is consumed, processed, and misunderstood—knowledge that now informs every UI I build.",
  },
  {
    date: "2020 — Present",
    org: "Technical Specialization",
    title: "React, Next.js & Advanced SEO Strategy",
    description:
      "Post-graduation, I transitioned into full-stack development, marrying my communication skills with technical rigor. I specialize in the modern web stack, focusing on performance-first applications that rank highly and convert effortlessly.",
    tags: ["React 18", "Next.js (App Router)", "TypeScript", "Technical SEO", "Tailwind CSS"],
  },
];

export const expertiseAreas = [
  {
    icon: "dns",
    title: "Scalable Systems & Architecture",
    description:
      "Enterprise applications require more than just code; they require a foundation built for longevity. I specialize in building high-performance, secure, and maintainable web platforms using the React ecosystem.",
    quoteLabel: "How I Work",
    quote:
      "I treat code as a living organism. Every component is designed to be modular, every API call optimized for latency, and every state transition predictable.",
    focusLabel: "Core Technical Focus",
    tags: ["React 18+", "Next.js (App Router)", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "GraphQL"],
  },
  {
    icon: "psychology",
    title: "Media Psychology & UI/UX",
    description:
      "Design is not just how it looks, but how it makes the user feel and act. Using cognitive science principles, I build frictionless journeys that convert passive scrollers into loyal brand advocates.",
    quoteLabel: "Philosophy",
    quote:
      "The best interface is the one that disappears. I focus on reducing the mental effort required to complete a task, allowing the brand's value to take center stage.",
    focusLabel: "Core Technical Focus",
    tags: ["Cognitive Load Optimization", "Behavioral Trigger Mapping", "Emotional Intelligence Design"],
  },
  {
    icon: "hub",
    title: "Entity-First Technical SEO",
    description:
      "Moving beyond keywords to semantic context. I implement advanced Schema.org structures and technical optimizations that help search engines understand the intent and relationship of your content.",
    quoteLabel: "How I Work",
    quote:
      "I don't play catch-up with algorithm updates. I align with the core objective of search engines: providing the most authoritative answer to a user's intent.",
    focusLabel: "Data Structure Mastery",
    tags: ["Semantic Authority", "Core Web Vitals", "JSON-LD", "Indexing", "Entity Mapping"],
  },
];

export const methodologySteps = [
  { number: "01", title: "Research", description: "Deep dive into user intent, market gaps, and cognitive patterns unique to your niche." },
  { number: "02", title: "Architect", description: "Building the structural logic using Next.js, ensuring the system handles scale effortlessly." },
  { number: "03", title: "Design", description: "Applying high-fidelity visual tokens and psychological triggers to create resonance." },
  { number: "04", title: "Optimize", description: "Continuous refinement of technical SEO and speed metrics for organic dominance." },
];

export const serviceMethodologySteps = [
  { number: "01", title: "Discovery", description: "Auditing current digital assets and identifying behavioral opportunities." },
  { number: "02", title: "Architecture", description: "Defining the entity structure, tech stack, and design logic." },
  { number: "03", title: "Execution", description: "High-fidelity development and rigorous UI crafting." },
  { number: "04", title: "Optimization", description: "Iterative refinements based on data and real-user behavior." },
];

export const services = [
  {
    icon: "architecture",
    title: "Scalable Web Architecture",
    description:
      "Building enterprise-grade systems focusing on React, Next.js, and headless architectures designed for performance and longevity.",
    tags: ["Next.js 14", "TypeScript"],
  },
  {
    icon: "psychology",
    title: "Psychological UI/UX Design",
    description:
      "Minimizing cognitive load through behavioral triggers and sensory design, ensuring every interaction feels intuitive and purposeful.",
    tags: ["Behavioral UX", "A11y"],
  },
  {
    icon: "database",
    title: "Entity-First Technical SEO",
    description:
      "Optimizing for semantic authority and semantic search relevance. I build sites that search engines understand natively.",
    tags: ["Schema.org", "Entity SEO"],
  },
];

export const serviceStack = ["React", "TypeScript", "Tailwind", "Node.js", "WordPress", "Webflow", "GraphQL", "Figma"];

export const inquiryTypes = [
  "Enterprise Consultation",
  "Freelance Partnership",
  "System Architecture Review",
  "Other Collaboration",
];

export const dashboardNavLinks = [
  { icon: "dashboard", label: "Overview", href: "/dashboard" },
  { icon: "mail", label: "Inquiries", href: "/dashboard/inquiries" },
  { icon: "folder_special", label: "Projects", href: "/dashboard/projects" },
  { icon: "terminal", label: "Technical Stack", href: "/dashboard/stack" },
  { icon: "history_edu", label: "Journal", href: "/dashboard/journal" },
  { icon: "settings", label: "Settings", href: "/dashboard/settings" },
];

export const dashboardFooterLinks = [
  { icon: "inventory_2", label: "Archive", href: "/dashboard/archive" },
  { icon: "contact_support", label: "Support", href: "/dashboard/support" },
];

export const footerLinks = [
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "GitHub", href: siteConfig.github },
  { label: "Philosophy", href: "/about" },
  { label: "Now", href: "/now" },
];

export const legalFooterLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Entity Schema", href: "/schema" },
];

export const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "Three core areas: scalable web architecture (React, Next.js, TypeScript), psychological UI/UX design that reduces cognitive load and improves conversion, and entity-first technical SEO using Schema.org and semantic structure rather than just keyword targeting.",
  },
  {
    question: "What's your tech stack?",
    answer:
      "React, TypeScript, Tailwind CSS, and Node.js on the engineering side; WordPress and Webflow for content-driven builds; Figma for design; GraphQL where an API layer calls for it.",
  },
  {
    question: "Are you available for freelance work right now?",
    answer:
      "Yes — available for freelance partnerships and high-impact enterprise consultations. The fastest way to start a conversation is the contact form, with an inquiry type so it routes appropriately.",
  },
  {
    question: "Where are you based, and do you work with international clients?",
    answer:
      "Based in Nairobi, Kenya, working remotely with clients across time zones — the SaaS platforms in the portfolio (LocateSafe, EduConnect) were built for and are used by teams outside Kenya.",
  },
  {
    question: "What's your typical response time?",
    answer: "24–48 business hours for inquiries submitted through the contact form.",
  },
  {
    question: "Do you work on existing codebases, or only new builds?",
    answer:
      "Both. A lot of the work described under 'Scalable Web Architecture' is exactly this — auditing an existing system's architecture and performance, then refactoring toward something that holds up as it grows, not just building greenfield.",
  },
  {
    question: "What makes your approach different?",
    answer:
      "A background in Linguistics, Media and Communication (Moi University) shapes how the technical work gets applied — treating UI decisions as information-processing problems, not just visual ones, and pairing that with the same rigor on the engineering and SEO side.",
  },
  {
    question: "How do I get started?",
    answer:
      "Use the contact form and pick the inquiry type that best matches what you need — enterprise consultation, freelance partnership, architecture review, or something else. Include a brief on the project and you'll hear back within 24–48 business hours.",
  },
];

export const homePhilosophy = {
  eyebrow: "The Philosophy",
  title: "Bridging Technical Architecture & Human Experience",
  paragraphs: [
    "With a Bachelor of Arts in Linguistics, Media and Communication from Moi University, my approach to technology is fundamentally rooted in how humans process information.",
    "I don't just build websites; I construct digital narratives that respect cognitive load and leverage psychological triggers to drive conversion.",
    "Whether it's optimizing a Next.js server component or refining a brand's visual identity, my goal is always clarity, performance, and impact.",
  ],
};

export const images = {
  heroPortrait: {
    src: "/images/jymoo.jpg",
    alt: "James Maruti in a black cap, striped shirt, and puffer vest, standing outdoors.",
  },
  aboutPortrait: {
    src: "/images/jymoo.jpg",
    alt: "James Maruti in a black cap, striped shirt, and puffer vest, standing outdoors.",
  },
  signInPortrait: {
    src: "/images/jymoo.jpg",
    alt: "James Maruti in a black cap, striped shirt, and puffer vest, standing outdoors.",
  },
  termsPortrait: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBenrgxkwdeDKu50FGLp8IFjSsDXEOQEjQ26PKqgYW2XgqA5TieilTqVTaPKr_Pb7D_6cmypjHKis3x2pKH_cF9IUepCsDlXU3Lef_QXZKK98iPo-Y9qf7Zl-RATxbYgUWM7mf1mrzk-ZHGWEKR4kbnHub9kcE6Xl4bZheD6Gd39QBF7NTzJV-lgYSLzqSQryR3lmRIdJfRBX4i3tl9CGiK-zt2nhBK5nJAk0YOyuv8EStFDqriPdRK7Ds8EgpfqbAGkoqyL_Tmd94",
    alt: "Architectural workspace representing the Maruti digital ecosystem.",
  },
  settingsAvatar: {
    src: "/images/jammees.png",
    alt: "James Maruti profile photo.",
  },
};
