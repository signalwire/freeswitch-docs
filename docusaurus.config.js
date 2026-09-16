// @ts-check
// FreeSWITCH Users Manual - Docusaurus configuration.
// Branding and style are retained from the existing freeswitch-docs site:
// the SignalWire color palette and fonts live in src/css/custom.scss, and the
// logo, favicon, footer, and announcement bar are carried over unchanged.

// SignalWire code theme. Per the design system, code blocks are ALWAYS dark
// (terminal aesthetic) in both light and dark site themes, so this single theme
// is used for `theme` and `darkTheme`. Colors are the DTCG syntax tokens.
const signalwireCodeTheme = {
  plain: { color: "#d4d4d8", backgroundColor: "#1e1e1f" },
  styles: [
    {
      types: ["comment", "prolog", "cdata", "doctype"],
      style: { color: "#898995", fontStyle: "italic" },
    },
    { types: ["punctuation"], style: { color: "#a0a0aa" } },
    { types: ["property", "attr-name"], style: { color: "#ffffff" } },
    {
      types: ["string", "char", "attr-value", "inserted"],
      style: { color: "#40e0d0" },
    },
    { types: ["function", "method"], style: { color: "#40e0d0" } },
    {
      types: ["keyword", "atrule", "rule", "important", "tag", "selector"],
      style: { color: "#6e9eff" },
    },
    { types: ["decorator", "annotation"], style: { color: "#6e9eff" } },
    {
      types: ["number", "boolean", "constant", "symbol"],
      style: { color: "#ff6da0" },
    },
    {
      types: ["class-name", "builtin", "type", "deleted"],
      style: { color: "#ff6da0" },
    },
    { types: ["operator", "entity", "url"], style: { color: "#ffd700" } },
    { types: ["variable"], style: { color: "#d4d4d8" } },
  ],
};

const rehypeLlmsCleanup = require("./plugins/rehype-llms-cleanup");

// The llms-txt plugin matches every section and exclude glob against
// Docusaurus' FINAL route paths, which include baseUrl. With baseUrl
// "/freeswitch" and docs routeBasePath "/", every route is "/freeswitch/<slug>",
// so every glob below carries the prefix -- including the plugin's own default
// exclusions, which are written as "/search" etc. and never fire here.
const B = "/freeswitch";

/** @type {import('@docusaurus/types').Config} */
const config = {
  themes: ["docusaurus-theme-search-typesense"],
  title: "FreeSWITCH Users Manual",
  tagline: "Configure, set up, and use FreeSWITCH",
  url: "https://developer.signalwire.com",
  baseUrl: "/freeswitch",
  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  favicon: "img/favicon.webp",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
      onBrokenMarkdownImages: "throw"
    },
  },

  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US"],
  },

  // SignalWire design system typefaces: Instrument Sans (headings),
  // Lexend (body), JetBrains Mono (code).
  headTags: [
    {
      tagName: "link",
      attributes: { rel: "preconnect", href: "https://fonts.googleapis.com" },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
  ],
  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Lexend:wght@300;400;500;600&display=swap",
      rel: "stylesheet",
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          editUrl: "https://github.com/signalwire/freeswitch-docs/tree/main/",
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      typesense: require("./config/typesense"),
      navbar: {
        logo: {
          alt: "FreeSWITCH Users Manual",
          src: "img/logo.svg",
          // White variant for dark mode - the navy mark is unreadable on the
          // dark surface. Docusaurus swaps this automatically with the theme.
          srcDark: "img/logo-white.svg",
        },
        items: [
          {
            href: "https://github.com/signalwire/freeswitch",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      // Dark / light / auto. The SignalWire design system is dark-mode-first, so
      // dark is the default; respectPrefersColorScheme makes the initial theme
      // follow the visitor's OS setting ("auto"), and the navbar switch lets
      // them override it explicitly.
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: "fs-office-hours",
        content:
          '<a target="_blank" class="banner-link" href="https://info.signalwire.com/freeswitch-office-hours-signup">FreeSWITCH Office Hours</a>Talk to the experts on the first and third Tuesday of every month. <a class="button button--primary button--sm" href="https://info.signalwire.com/freeswitch-office-hours-signup">Sign up</a>',
      },
      // Footer modeled on signalwire.com: a brand column (logo + tagline)
      // followed by link columns. Always renders on the dark surface.
      footer: {
        // Colors come from the design tokens in custom.scss so the footer
        // follows the active theme (dark / light / auto).
        style: "light",
        links: [
          {
            // Title is required by Docusaurus but visually hidden (sr-only) so
            // the brand column reads as a logo block, as on signalwire.com.
            title: "FreeSWITCH",
            items: [
              {
                html: `
                  <div class="footer__brand">
                    <img src="/freeswitch/img/logo.svg" alt="FreeSWITCH" class="footer__brand-logo footer__brand-logo--light" />
                    <img src="/freeswitch/img/logo-white.svg" alt="FreeSWITCH" class="footer__brand-logo footer__brand-logo--dark" />
                    <p class="footer__brand-tagline">The open source platform for voice, video, and messaging.</p>
                    <p class="footer__brand-note">Maintained by SignalWire</p>
                  </div>
                `,
              },
            ],
          },
          {
            title: "Documentation",
            items: [
              { label: "Getting Started", to: "/foundations/getting-started" },
              { label: "Module Reference", to: "/module-reference" },
              { label: "Recipes", to: "/recipes" },
              { label: "Troubleshooting", to: "/troubleshooting" },
              { label: "Programming (ESL)", to: "/programming" },
            ],
          },
          {
            title: "Reference",
            items: [
              { label: "CLI and API", to: "/reference/cli-and-api" },
              { label: "Channel Variables", to: "/reference/channel-variables" },
              { label: "Core Concepts", to: "/foundations/introduction" },
            ],
          },
          {
            title: "Downloads",
            items: [
              {
                label: "Open Source FreeSWITCH",
                href: "https://github.com/signalwire/freeswitch/releases",
              },
              {
                label: "FreeSWITCH Enterprise",
                href: "https://github.com/signalwire/stack/releases",
              },
              {
                label: "GitHub",
                href: "https://github.com/signalwire/freeswitch",
              },
            ],
          },
          {
            title: "Community",
            items: [
              { label: "Forums", href: "https://forum.signalwire.community/" },
              { label: "YouTube", href: "https://www.youtube.com/freeswitch" },
              { label: "X (Twitter)", href: "https://twitter.com/freeswitch" },
              { label: "ClueCon", href: "https://www.cluecon.com/" },
            ],
          },
          {
            title: "SignalWire",
            items: [
              { label: "SignalWire.com", href: "https://signalwire.com" },
              {
                label: "Office Hours",
                href: "https://info.signalwire.com/freeswitch-office-hours-signup",
              },
              {
                label: "Contact Sales",
                href: "mailto:sales@signalwire.com",
              },
            ],
          },
        ],
      },
      prism: {
        theme: signalwireCodeTheme,
        darkTheme: signalwireCodeTheme,
        additionalLanguages: [
          "lua",
          "php",
          "csharp",
          "ruby",
          "java",
          "ini",
          "bash",
          "json",
          "perl",
          "c",
        ],
      },
    }),

  plugins: [
    "docusaurus-plugin-sass",
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-MSSDFRQM",
      },
    ],
    [
      "@signalwire/docusaurus-plugin-llms-txt",
      {
        // A route we cannot convert, or a section whose glob matches nothing,
        // is a config bug we want to see -- both default to dropping content
        // silently. This matches the site's onBrokenLinks/onBrokenAnchors
        // posture. logLevel 2 because the route-filtering summary that makes
        // those failures diagnosable is info-level and hidden at the default 1.
        onRouteError: "throw",
        onSectionError: "throw",
        logLevel: 2,

        markdown: {
          enableFiles: true,
          // Absolute URLs. This manual is one of several doc sets under
          // developer.signalwire.com and llms.txt is read out of context.
          relativePaths: false,
          includeDocs: true,
          includeBlog: false,
          includePages: false,
          includeVersionedDocs: false,
          includeGeneratedIndex: true,
          // /freeswitch/search is the Typesense route: classified as a doc, so
          // without this it becomes search.md. The debug routes only exist when
          // DOCUSAURUS_DEBUG is set; excluded as cheap insurance.
          excludeRoutes: [`${B}/search`, `${B}/__docusaurus/**`],
          beforeDefaultRehypePlugins: [rehypeLlmsCleanup],
        },

        llmsTxt: {
          enableLlmsFullTxt: false,
          includeDocs: true,
          includeBlog: false,
          includePages: false,
          includeVersionedDocs: false,
          includeGeneratedIndex: true,
          excludeRoutes: [`${B}/search`, `${B}/__docusaurus/**`],

          siteTitle: "FreeSWITCH Users Manual",
          siteDescription:
            "Configure, set up, and use FreeSWITCH: the open source platform for voice, video, and messaging.",
          enableDescriptions: true,

          // Only a safety net -- the sections below cover every existing route. A
          // new top-level folder nobody sectioned shows up on its own at the
          // bottom rather than collapsing into a section named "Freeswitch".
          autoSectionDepth: 2,
          autoSectionPosition: 99,

          // Names and descriptions track each Part's index.mdx frontmatter.
          // NOTE the three globs that differ from their folder name:
          // configuration-system -> /configuration, users-endpoints ->
          // /users-and-endpoints, media -> /media-and-codecs.
          sections: [
            {
              id: "overview",
              name: "Overview",
              description: "The manual's front page and reading path.",
              position: 0,
              // Trailing slash required: the route is "/freeswitch/" and the
              // glob "/freeswitch" does not match it.
              routes: [{ route: `${B}/` }],
            },
            {
              id: "foundations",
              name: "Part 1: Foundations",
              description:
                "Core concepts and how to get a FreeSWITCH instance running.",
              position: 1,
              routes: [{ route: `${B}/foundations/**` }],
            },
            {
              id: "configuration-system",
              name: "Part 2: The Configuration System",
              description:
                "How FreeSWITCH is configured through its XML configuration system.",
              position: 2,
              routes: [{ route: `${B}/configuration/**` }],
            },
            {
              id: "users-endpoints",
              name: "Part 3: Users and Endpoints",
              description:
                "Define users and connect SIP, WebRTC, and gateway endpoints.",
              position: 3,
              routes: [{ route: `${B}/users-and-endpoints/**` }],
            },
            {
              id: "dialplan",
              name: "Part 4: Call Routing and the Dialplan",
              description:
                "Route calls with the XML dialplan, contexts, and dptools.",
              position: 4,
              routes: [{ route: `${B}/dialplan/**` }],
            },
            {
              id: "media",
              name: "Part 5: Media and Codecs",
              description:
                "Codec negotiation, media handling, and audio playback.",
              position: 5,
              routes: [{ route: `${B}/media-and-codecs/**` }],
            },
            {
              id: "applications",
              name: "Part 6: Applications and Features",
              description: "The bundled dialplan applications and features.",
              position: 6,
              routes: [{ route: `${B}/applications/**` }],
            },
            {
              id: "integration",
              name: "Part 7: Integration and Control",
              description:
                "Control and integrate FreeSWITCH with external systems.",
              position: 7,
              routes: [{ route: `${B}/integration/**` }],
            },
            {
              id: "reference",
              name: "Part 8: Reference",
              description:
                "CLI and API reference, channel variables, and appendices.",
              position: 8,
              routes: [{ route: `${B}/reference/**` }],
            },
            {
              id: "module-reference",
              name: "Part 9: Module Reference",
              description:
                "A per-module reference for the bundled FreeSWITCH modules not covered in the topical chapters: purpose, configuration, the applications and API commands they register, and the channel variables they use.",
              position: 9,
              routes: [{ route: `${B}/module-reference/**` }],
            },
            {
              id: "recipes",
              name: "Part 10: Recipes",
              description:
                "End-to-end worked examples that compose the configuration, dialplan, and applications from the reference chapters into complete, working call flows.",
              position: 10,
              routes: [{ route: `${B}/recipes/**` }],
            },
            {
              id: "troubleshooting",
              name: "Part 11: Troubleshooting",
              description:
                "Diagnose the common failures operators hit — registration, audio, and call-setup problems — using FreeSWITCH's own console, status, and tracing tools.",
              position: 11,
              routes: [{ route: `${B}/troubleshooting/**` }],
            },
            {
              id: "programming",
              name: "Part 12: Programming with the Event Socket and Scripting",
              description:
                "Drive FreeSWITCH from code: the event model, an events catalog, the inbound and outbound Event Socket, and the embedded scripting APIs.",
              position: 12,
              routes: [{ route: `${B}/programming/**` }],
            },
          ],

          optionalLinks: [
            {
              title: "FreeSWITCH source",
              url: "https://github.com/signalwire/freeswitch",
              description: "Source code, releases, and issue tracking",
            },
            {
              title: "SignalWire capability map",
              url: "https://developer.signalwire.com/freeswitch/reference/signalwire-map.md",
              description:
                "How each FreeSWITCH capability maps to SignalWire Cloud",
            },
          ],
        },
      },
    ],
  ],

  scripts: [
    {
      src: "/freeswitch/scripts/zoomInfo.js",
      async: true,
      nonce: "SIGNALWIRE_DOCS_CSP_NONCE",
    },
    {
      src: "/freeswitch/scripts/fullstory.js",
      async: true,
    },
    {
      src: "/freeswitch/scripts/munchkin.js",
      async: true,
    },
    {
      src: "/freeswitch/scripts/zendesk.js",
      async: true,
    },
  ],
};

module.exports = config;
