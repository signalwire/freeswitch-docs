// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion


const Themes = require("prism-react-renderer").themes;
const lightCodeTheme = Themes.github;
const darkCodeTheme = Themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {

  themes: [
    "docusaurus-theme-search-typesense",
  ],
  title: "FreeSWITCH Documentation",
  url: "https://developer.signalwire.com",
  baseUrl: "/freeswitch/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onBrokenAnchors: "throw",
  favicon: "img/favicon.webp",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
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
        //title: "FreeSWITCH Documentation",
        logo: {
          alt: "FreeSWITCH Documentation",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "FreeSWITCH-Explained/index",
            position: "left",
            label: "FreeSWITCH Explained",
          },
          {
            type: "doc",
            docId: "Channel-Variables-Catalog/index",
            position: "left",
            label: "Variables",
          },
          {
            type: "doc",
            docId: "FreeSWITCH-Explained/Modules/index",
            position: "left",
            label: "Modules",
          },
          {
            href: "pathname:///../guides",
            label: "SignalWire",
            position: "left",
            target: "_self",
          },
          {
            href: "https://github.com/signalwire/freeswitch",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      colorMode: { disableSwitch: true, defaultMode: "light" },
      announcementBar: {
        id: `fs-office-hours`,
        content: `<a target="_blank" class="banner-link" href="https://info.signalwire.com/freeswitch-office-hours-signup">FreeSWITCH Office Hours</a>Talk to the experts on the first and third Tuesday of every month. <a class="button button--primary button--sm" href="https://info.signalwire.com/freeswitch-office-hours-signup">Sign up</a>`,
        // textColor,
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
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["lua", "php", "csharp", "ruby", "java", "ini", "bash", "json", "perl", "c"],
      }
    }),

  plugins: ["docusaurus-plugin-sass"],
  headTags: [],
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
      async: true
    },
      /*
    {
      src: "/freeswitch/scripts/bannerica.js"
    },

       */
  ],
  stylesheets: [
      //"/freeswitch/styles/bannerica.css?v=0.1.3"
  ]
};

module.exports = config;
