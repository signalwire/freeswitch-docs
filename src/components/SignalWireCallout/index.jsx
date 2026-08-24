import React from "react";
import Link from "@docusaurus/Link";

const UTM = {
  utm_source: "freeswitch-docs",
  utm_medium: "callout",
  utm_campaign: "same-engine",
};

/**
 * A demarcated aside mapping a manual topic to its hosted SignalWire
 * equivalent. Scope rules: maximum one per page, never inside a procedure.
 * Outbound links carry UTM parameters; utm_content is the page id.
 */
export default function SignalWireCallout({ title, href, page, linkText, children }) {
  const url = new URL(href);
  for (const [key, value] of Object.entries(UTM)) {
    url.searchParams.set(key, value);
  }
  if (page) {
    url.searchParams.set("utm_content", page);
  }
  return (
    <aside className="sw-callout">
      <p className="sw-callout__eyebrow">SignalWire Cloud</p>
      {title && <p className="sw-callout__title">{title}</p>}
      <div className="sw-callout__body">{children}</div>
      <p className="sw-callout__links">
        <a href={url.toString()} target="_blank" rel="noopener noreferrer">
          {linkText || "Read the SignalWire docs"}
        </a>
        <span aria-hidden="true"> &middot; </span>
        <Link to="/reference/signalwire-map">Full capability map</Link>
      </p>
    </aside>
  );
}
