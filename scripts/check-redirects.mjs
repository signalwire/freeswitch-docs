#!/usr/bin/env node
// End-to-end redirect check against a running image.
// Usage: node scripts/check-redirects.mjs http://localhost:8080
//
// Every legacy rule must 301 straight to a page that returns 200 (no chains),
// and any #fragment in the target must exist on that page.
import { readFileSync } from "node:fs";
import { readRows } from "./build-legacy-redirects.mjs";

const base = (process.argv[2] || "http://localhost:8080").replace(/\/$/, "");
const failures = [];
const pages = new Map();

async function page(path) {
  if (!pages.has(path)) {
    const res = await fetch(base + path, { redirect: "manual" });
    pages.set(path, { status: res.status, html: res.status === 200 ? await res.text() : "" });
  }
  return pages.get(path);
}

async function expectRedirect(from, want) {
  const res = await fetch(base + from, { redirect: "manual" });
  const location = res.headers.get("location");
  if (res.status !== 301 || (want && location !== want)) {
    failures.push(`${from}: got ${res.status} ${location}, wanted 301 ${want}`);
    return;
  }
  if (location.startsWith("/docs")) return; // Served by another site.
  const [path, fragment] = location.split("#");
  const target = await page(path);
  if (target.status !== 200) failures.push(`${from}: target ${path} returned ${target.status}`);
  else if (fragment && !target.html.includes(`id="${fragment}"`)) {
    failures.push(`${from}: anchor #${fragment} is missing from ${path}`);
  }
}

const rows = readRows();
for (const { kind, legacy, target } of rows) {
  const want = `/freeswitch/${target}`;
  if (kind === "section") {
    await expectRedirect(`/freeswitch/${legacy}/any-unmapped-page-xyz`, want);
    continue;
  }
  await expectRedirect(`/freeswitch/${legacy}`, want);
  await expectRedirect(`/freeswitch/${legacy}/`, want);
  await expectRedirect(`/freeswitch/${legacy}?utm_source=old-link`, want);
}

const older = readFileSync("provisioning/nginx/redirects.map", "utf8")
  .split("\n")
  .map((line) => line.match(/^(\/\S+)\s+"?([^";]+)"?;\s*$/))
  .filter(Boolean)
  .filter((m) => !/\/(FreeSWITCH-Explained|Channel-Variables-Catalog)(\/|$|\?)/.test(m[1]));
for (const [, from, to] of older) await expectRedirect(from, to);

// Fallback, 404 page and the trailing slash behavior the canonicals rely on.
await expectRedirect("/freeswitch/FreeSWITCH-Explained/Not-A-Real-Section/page", "/freeswitch/");
await expectRedirect("/freeswitch/reference/cli-and-api", "/freeswitch/reference/cli-and-api/");
const home = await page("/freeswitch/reference/cli-and-api/");
if (!home.html.includes('rel="canonical" href="https://developer.signalwire.com/freeswitch/reference/cli-and-api/"')) {
  failures.push("canonical on /reference/cli-and-api/ does not use the trailing slash");
}
const missing = await fetch(`${base}/freeswitch/does-not-exist`, { redirect: "manual" });
const missingBody = await missing.text();
if (missing.status !== 404 || !missingBody.includes("<!doctype html>")) {
  failures.push(`missing page returned ${missing.status} without the site 404 page`);
}

console.log(`Checked ${rows.length} legacy rules and ${older.length} older redirects.`);
if (failures.length) {
  console.error(`${failures.length} failures:\n` + failures.slice(0, 40).join("\n"));
  process.exit(1);
}
console.log("All redirects land on a live page in one hop.");
