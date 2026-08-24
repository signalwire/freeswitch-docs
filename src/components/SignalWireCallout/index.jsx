import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

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
export default function SignalWireCallout({ title, href, page, linkText, anchor, variant, children }) {
  const id = anchor || "signalwire";
  const url = new URL(href);
  for (const [key, value] of Object.entries(UTM)) {
    url.searchParams.set(key, value);
  }
  if (page) {
    url.searchParams.set("utm_content", page);
  }
  const className = variant ? `sw-callout sw-callout--${variant}` : "sw-callout";
  return (
    <aside className={className} id={id}>
      <p className="sw-callout__eyebrow">
        <img
          className="sw-callout__logo"
          src={useBaseUrl("/img/signalwire-mark.svg")}
          alt=""
          width="16"
          height="16"
        />
        SignalWire Cloud
      </p>
      {title && (
        <p className="sw-callout__title">
          {title}
          <a
            className="sw-callout__hash"
            href={`#${id}`}
            aria-label="Direct link to this callout"
            title="Direct link to this callout"
          >
            #
          </a>
        </p>
      )}
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
