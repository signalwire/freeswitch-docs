# FreeSWITCH Manual (Rewrite Plan)

This directory holds the plan and source content for a ground-up rewrite of the
FreeSWITCH manual. The goal is a clear, accurate, user-facing manual that teaches
practitioners how to configure, set up, and use FreeSWITCH, written in
GitHub-flavored Markdown and published with Docusaurus.

This README defines purpose, scope, source-of-truth method, authoring conventions,
and the production workflow. The full chapter outline lives in
[`TABLE-OF-CONTENTS.md`](./TABLE-OF-CONTENTS.md).

## Table of Contents

1. [Purpose and Audience](#1-purpose-and-audience)
2. [Scope](#2-scope)
3. [Source of Truth Method](#3-source-of-truth-method)
4. [Review of the Existing Documentation](#4-review-of-the-existing-documentation)
5. [Information Architecture](#5-information-architecture)
6. [Authoring Conventions](#6-authoring-conventions)
7. [Per-Page Template](#7-per-page-template)
8. [Production Workflow and Phasing](#8-production-workflow-and-phasing)
9. [Tooling and Build](#9-tooling-and-build)

## 1. Purpose and Audience

The manual teaches a technically competent operator how to take FreeSWITCH from a
baseline install to a working, configured system. It documents the operator-facing
configuration surface: the XML configuration system, the user directory, SIP
profiles, the dialplan, codec selection and negotiation, media handling, the
bundled applications, WebRTC, and the integration interfaces exposed through
configuration.

The audience is competent with networking, SIP/VoIP concepts, and editing
configuration files. The manual does not teach telephony fundamentals from zero,
and it does not teach programming.

## 2. Scope

### In scope

- The XML configuration system: preprocessor, includes, variables, sections.
- Core settings (`switch.conf.xml`) and global variables (`vars.xml`).
- Module loading and management (`modules.conf.xml`).
- The user directory: domains, users, groups, parameters, and variables.
- SIP via Sofia: profiles, settings, gateways, and trunk registration.
- The dialplan: contexts, extensions, conditions, actions, and the application set.
- Codec selection, negotiation, transcoding, and the codec modules.
- Media handling: proxy/bypass media, early media, RTP and SRTP options.
- Audio file playback and streaming sources.
- Bundled applications: voicemail, conferencing, IVR menus, FIFO, call center,
  valet parking, and the utility applications.
- WebRTC: Verto and SIP over WSS, plus `mod_rtc`.
- Access control configured through `acl.conf.xml`.
- Integration surfaces configured by the operator: Event Socket, XML Curl,
  CDR, scripting wiring, and SignalWire connectivity.
- A channel variables reference.

### Out of scope (never include)

- The FreeSWITCH codebase itself: internal implementation, code structure,
  functions, data flow, or source-level behavior.
- Troubleshooting, debugging, or diagnostics of any kind.
- Deployment, provisioning, scaling, hardening, or operations guidance.
- High availability, performance tuning, and enterprise deployment topics.

Some legacy topics sit on a boundary. ACLs, authentication, and TLS/WSS are
documented strictly as configuration surface (what the parameters are and what
values they accept), never as security hardening guidance. Where a topic crosses
into operations, the manual documents the configuration and stops.

## 3. Source of Truth Method

The source code is the authority for correctness and is never itself a subject to
document. Every factual claim about a parameter name, accepted value, default,
feature availability, or configuration semantic is verified against the source
before it is written.

The verification hierarchy for any claim:

1. The shipped default configuration under `conf/vanilla/` shows the real,
   working shape of each file and the documented inline comments.
2. The module source under `src/mod/<category>/<module>/` is authoritative for
   parameter names, accepted values, and defaults. Parameter parsing is the
   definitive reference (look for the config-load routines that read each
   `param name=...`).
3. The core source under `src/` is authoritative for the preprocessor, the XML
   registry, sections, and core settings.

When a value cannot be derived from the configuration surface or the source, the
manual states the gap rather than inventing behavior.

[`TABLE-OF-CONTENTS.md`](./TABLE-OF-CONTENTS.md) lists, per chapter, the exact
config files and source directories that are authoritative for that chapter.

## 4. Review of the Existing Documentation

The current site under `../freeswitch-docs/` is a Docusaurus 3 project containing
roughly 1,685 MDX files, the bulk of which are an import of the legacy
"FreeSWITCH Explained" wiki, plus a 677-entry "Channel Variables Catalog".

Strengths to carry forward:

- Broad coverage and a large channel-variable catalog worth preserving as
  reference material.
- A working Docusaurus toolchain (theme, search via Typesense, build pipeline).

Problems this rewrite corrects:

- **Mixed scope.** The legacy tree mixes operator configuration with internals,
  troubleshooting, debugging, enterprise deployment, virtualization, and community
  meta-pages. The rewrite is restricted to the configuration surface defined above.
- **No single learning path.** Content is a flat wiki, not a manual. There is no
  ordered progression from install to a working system. The rewrite is a numbered,
  sequential manual with a Getting Started chapter.
- **Drift and staleness.** Wiki pages reference values and behaviors that are not
  re-verified against current source. The rewrite verifies every parameter against
  the code as described in Section 3.
- **Inconsistent structure.** Pages vary in format and depth. The rewrite uses one
  page template (Section 7) and consistent parameter tables.

The legacy site is retained as-is for reference during authoring and is not edited.
The new manual is built fresh in this directory.

## 5. Information Architecture

The manual is organized into numbered parts, each containing numbered chapters.
The ordering follows the path an operator takes: understand the model, install and
run, learn the configuration system, define who can connect, route their calls,
handle media, add features, then integrate and control. The full annotated outline
is in [`TABLE-OF-CONTENTS.md`](./TABLE-OF-CONTENTS.md).

Top-level parts:

- Part I: Foundations
- Part II: The Configuration System
- Part III: Users and Endpoints
- Part IV: Call Routing and the Dialplan
- Part V: Media and Codecs
- Part VI: Applications and Features
- Part VII: Integration and Control
- Part VIII: Reference

## 6. Authoring Conventions

These conventions are derived from the project `CLAUDE.md` and are mandatory.

- **Document opening.** Every document opens with a title, followed by a Table of
  Contents that links to each chapter and major section.
- **Structure.** Content is organized into numbered chapters with clear headings
  and subheadings.
- **Parameter definitions.** Each configuration parameter is defined by name,
  purpose, accepted values, and default where one exists. Use a parameter
  reference table per config section with the columns: Parameter, Purpose,
  Values, Default.
- **Formatting.** Use fenced code blocks for configuration snippets, tables for
  parameter references, and inline code for filenames, parameters, and values.
- **Voice.** Be precise, direct, and concise. Use authoritative, declarative
  phrasing, not narrated tutorials.
- **No em dashes.** Do not use em dashes anywhere.
- **Gaps over invention.** When something is ambiguous or not derivable from the
  configuration surface or source, state the gap explicitly.

Path and naming conventions:

- One chapter per directory; one MDX file per major topic within a chapter.
- File names use kebab-case. Directories carry a numeric ordering prefix so the
  Docusaurus sidebar renders in manual order.
- Config file paths are written relative to the FreeSWITCH config root
  (for example `autoload_configs/sofia.conf.xml`, `directory/default/1000.xml`).

## 7. Per-Page Template

Every topic page follows this skeleton:

```markdown
# <Chapter N>. <Title>

<One-paragraph statement of what this page configures and why it matters.>

## Table of Contents
- links to each section on the page

## Overview
<What this subsystem does at the operator level. No internals.>

## Configuration files
<Which files own this configuration, relative to the config root.>

## Parameters
<One table per config section: Parameter | Purpose | Values | Default.>

## Examples
<Fenced, working configuration snippets drawn from or verified against conf/vanilla.>

## Related
<Cross-links to adjacent chapters.>
```

## 8. Production Workflow and Phasing

The manual is produced in dependency order so that early chapters ground later
ones. Each chapter is verified against its authoritative sources (Section 3)
before it is considered complete.

- **Phase 0: Scaffolding.** Stand up the Docusaurus project in this directory,
  port the theme and search config from the legacy site, and create the part and
  chapter directory skeleton with placeholder index pages and the sidebar.
- **Phase 1: Foundations and the Configuration System** (Parts I and II). These
  chapters establish the model and the config mechanics every later chapter relies
  on.
- **Phase 2: Users, Endpoints, and Routing** (Parts III and IV). The core PBX
  configuration path: directory, Sofia, dialplan.
- **Phase 3: Media and Codecs** (Part V).
- **Phase 4: Applications and Features** (Part VI).
- **Phase 5: Integration and Control** (Part VII).
- **Phase 6: Reference** (Part VIII), including the migrated and re-verified
  channel variable catalog.

Each chapter is drafted, then fact-checked against the named source files, then
linked into the sidebar.

## 9. Tooling and Build

The new site reuses the legacy Docusaurus 3 toolchain. Phase 0 ports the relevant
configuration from `../freeswitch-docs/`:

- `docusaurus.config.js` (title, navbar, footer, Typesense search).
- `sidebars.js`, adapted to the new numbered structure.
- Theme and static assets under `src/` and `static/`.

Content lives under `docs/` following the part and chapter structure in the
outline. The sidebar is defined explicitly (not autogenerated) so the manual
ordering is guaranteed.
