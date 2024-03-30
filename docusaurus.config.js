// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion


const Themes = require("prism-react-renderer").themes;
const lightCodeTheme = Themes.github;
const darkCodeTheme = Themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
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
          showLastUpdateTime: true,
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
      },
      algolia: {
        appId: "2NBPM6ETKJ",
        apiKey: "4489aa468117b5bfbcb83f7b0addddc9",
        indexName: "freeswitch-docs",
        externalUrlRegex: `.*`,
        /**
         * We need to set this to false, otherwise the query is done with
         * default filters such as "docusaurus_tag:docs-default-current", which
         * exclude all the content from README.
         *
         * Look for default facetFilters.
         */
        contextualSearch: false,
        /**
         * We need to disable the searchPage because the results there are not
         * accurate (they don't respect the contextualSearch setting value).
         *
         * Reference: https://github.com/facebook/docusaurus/issues/3805
         */
        searchPagePath: false,
      },
    }),

  plugins: ["docusaurus-plugin-sass"],
  headTags: [
    {
      tagName: "script",
      innerHTML: `
   window['_fs_host'] = 'fullstory.com';
  window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
  window['_fs_org'] = 'o-1QJ4QX-na1';
  window['_fs_namespace'] = 'FS';
  !function(m,n,e,t,l,o,g,y){var s,f,a=function(h){
  return!(h in m)||(m.console&&m.console.log&&m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'),!1)}(e)
  ;function j(b){var h,d=[];function k(){h&&(d.forEach((function(b){var d;try{d=b[h[0]]&&b[h[0]](h[1])}catch(h){return void(b[3]&&b[3](h))}
  d&&d.then?d.then(b[2],b[3]):b[2]&&b[2](d)})),d.length=0)}function r(b){return function(d){h||(h=[b,d],k())}}return b(r(0),r(1)),{
  then:function(b,h){return j((function(r,i){d.push([b,h,r,i]),k()}))}}}a&&(g=m[e]=function(){var b=function(b,d,k,r){function i(i,c){
  h(b,d,k,i,c,r)}r=r||2;var c,u=/Async$/;return u.test(b)?(b=b.replace(u,""),"function"==typeof Promise?new Promise(i):j(i)):h(b,d,k,c,c,r)}
  ;function h(h,d,k,r,i,c){return b._api?b._api(h,d,k,r,i,c):(b.q&&b.q.push([h,d,k,r,i,c]),null)}return b.q=[],b}(),y=function(b){function h(h){
  "function"==typeof h[4]&&h[4](new Error(b))}var d=g.q;if(d){for(var k=0;k<d.length;k++)h(d[k]);d.length=0,d.push=h}},function(){
  (o=n.createElement(t)).async=!0,o.crossOrigin="anonymous",o.src="https://"+l,o.onerror=function(){y("Error loading "+l)}
  ;var b=n.getElementsByTagName(t)[0];b.parentNode.insertBefore(o,b)}(),function(){function b(){}function h(b,h,d){g(b,h,d,1)}function d(b,d,k){
  h("setProperties",{type:b,properties:d},k)}function k(b,h){d("user",b,h)}function r(b,h,d){k({uid:b},d),h&&k(h,d)}g.identify=r,g.setUserVars=k,
  g.identifyAccount=b,g.clearUserCookie=b,g.setVars=d,g.event=function(b,d,k){h("trackEvent",{name:b,properties:d},k)},g.anonymize=function(){r(!1)
  },g.shutdown=function(){h("shutdown")},g.restart=function(){h("restart")},g.log=function(b,d){h("log",{level:b,msg:d})},g.consent=function(b){
  h("setIdentity",{consent:!arguments.length||b})}}(),s="fetch",f="XMLHttpRequest",g._w={},g._w[f]=m[f],g._w[s]=m[s],m[s]&&(m[s]=function(){
  return g._w[s].apply(this,arguments)}),g._v="2.0.0")}(window,document,window._fs_namespace,"script",window._fs_script);
  `,
      attributes: {
        type: "text/javascript",
      },
    },
  ],
  scripts: [// "/freeswitch/scripts/bannerica.js"
  ],
  stylesheets: ["/freeswitch/styles/bannerica.css"]
};

module.exports = config;
