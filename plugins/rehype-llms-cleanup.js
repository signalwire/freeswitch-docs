/**
 * Rehype pass for @signalwire/docusaurus-plugin-llms-txt.
 *
 * Runs via markdown.beforeDefaultRehypePlugins, on the already-extracted
 * `.theme-doc-markdown` subtree, before rehype-remark converts hast -> mdast.
 *
 *  1. Drop Docusaurus heading anchors (`a.hash-link`), whose link text is a
 *     zero-width space and which otherwise emit an empty `[](#slug)` under
 *     every heading on every page.
 *  2. Turn <aside class="sw-callout"> into a blockquote so the SignalWire
 *     asides read as asides instead of merging into the manual's prose, and
 *     drop their decorative logo and `#` permalink.
 *  3. Same for `:::note`-style admonitions, dropping the icon <span> but
 *     keeping the "note"/"tip" heading text.
 */

const DROP_CLASSES = new Set([
  "hash-link",
  "sw-callout__hash",
  "sw-callout__logo",
]);

// The admonition icon carries a hashed CSS-module suffix that changes between
// Docusaurus versions, so match on the prefix.
const DROP_CLASS_PREFIXES = ["admonitionIcon"];

const BLOCKQUOTE_CLASSES = ["sw-callout", "theme-admonition"];

function classList(node) {
  const raw = node && node.properties && node.properties.className;
  if (!raw) return [];
  return Array.isArray(raw) ? raw.map(String) : String(raw).split(/\s+/);
}

function shouldDrop(node) {
  if (!node || node.type !== "element") return false;
  const classes = classList(node);
  return classes.some(
    (c) => DROP_CLASSES.has(c) || DROP_CLASS_PREFIXES.some((p) => c.startsWith(p))
  );
}

module.exports = function rehypeLlmsCleanup() {
  return function transformer(tree) {
    (function walk(node) {
      if (!node || !Array.isArray(node.children)) return;
      node.children = node.children.filter((child) => !shouldDrop(child));
      for (const child of node.children) {
        if (child.type === "element") {
          const classes = classList(child);
          if (BLOCKQUOTE_CLASSES.some((c) => classes.includes(c))) {
            child.tagName = "blockquote";
          }
        }
        walk(child);
      }
    })(tree);
  };
};
