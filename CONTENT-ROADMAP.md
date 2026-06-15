# Learning-Content Roadmap

The current manual (Parts 1–9) is a **verified configuration reference**. Its
`README.md` deliberately excludes troubleshooting, diagnostics, deployment,
scaling, hardening, and operations. That keeps the reference tight, but it leaves
real gaps for someone trying to *learn* FreeSWITCH rather than look up a value.

This roadmap captures the highest-value additions for the FreeSWITCH audience and
the blueprint for each. Three new sections are planned. Where a section crosses
the manual's stated scope, it is flagged so the boundary is a conscious choice.

---

## Part 10 — Recipes / Worked Examples  (in scope)

**Why:** the manual documents every *piece* but never *composes* them. Recipes turn
the reference into something people can learn from. They use only features already
documented elsewhere and cross-link back to the relevant chapters.

Every recipe is verified against `conf/vanilla/` and the documented dialplan apps.

| Chapter | Recipe | Builds on |
|---|---|---|
| 10.1 | Inbound DID → IVR → Voicemail | public context (Ch 13), IVR menus (Ch 21), voicemail (Ch 19) |
| 10.2 | Ring group / hunt group (simultaneous + sequential) | `bridge` (Ch 14), directory (Ch 6) |
| 10.3 | Business-hours / time-of-day routing | time conditions (Ch 15), IVR/voicemail |
| 10.4 | Connecting two FreeSWITCH servers (box-to-box trunk) | gateways (Ch 8), dialplan (Ch 12) |
| 10.5 | A conference bridge with a PIN | conferencing (Ch 20), dialplan |
| 10.6 | Click-to-call / originate from the CLI | `originate` (Ch 31), bridge |

## Part 11 — Troubleshooting & Diagnostics  (scope expansion)

**Why:** the single most-searched newcomer need ("no audio", "won't register").
Diagnostics, not internals — it documents the *tools and reads*, not the C code.

| Chapter | Covers |
|---|---|
| 11.1 | The diagnostic toolbox: `fs_cli`, log levels, `sofia status`, `sofia global siptrace`, `sngrep`/pcap |
| 11.2 | Registration problems (auth, NAT, `sofia status profile … reg`) |
| 11.3 | Audio problems: no audio / one-way audio (NAT, RTP, codec mismatch, proxy vs bypass media) |
| 11.4 | Call-setup failures: reading hangup causes, `continue_on_fail`, gateway state |
| 11.5 | Reading a SIP trace and a CDR to localize a fault |

## Part 12 — Programming with the Event Socket & Scripting  (scope expansion)

**Why:** the manual *configures* `mod_event_socket` and the language modules but
never shows how to *program* them — the gap for every integrator.

| Chapter | Covers |
|---|---|
| 12.1 | The event model: events, subclasses, headers, the channel lifecycle |
| 12.2 | Events catalog (companion to the channel-variables catalog): the key events and their headers |
| 12.3 | ESL inbound socket: connect, subscribe, `api`/`bgapi`, consume events |
| 12.4 | ESL outbound socket: the `socket` app, the async/sync models |
| 12.5 | Scripting APIs: the `session` object, `freeswitch.API()`, event consumers (Lua and JS) |

---

## Approach

- One section per PR, built section by section, each `npm run build`-validated and
  cross-linked into the existing chapters.
- Recipes and scripting examples are verified against the real `conf/vanilla/`
  config and the registered applications/commands — same source-of-truth bar as
  the reference.
- Parts 11 and 12 are conscious scope expansions; if the manual should stay a pure
  reference, they can instead live as a separate companion guide.
