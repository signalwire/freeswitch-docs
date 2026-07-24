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
      footer: {
        style: "dark",
        links: [
          {
            title: "Video",
            items: [
              {
                label: "Youtube",
                href: "https://www.youtube.com/freeswitch",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Forums",
                href: "https://forum.signalwire.community/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/freeswitch",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Cluecon",
                href: "https://www.cluecon.com/",
              },
              {
                label: "GitHub",
                href: "https://github.com/signalwire/freeswitch",
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
