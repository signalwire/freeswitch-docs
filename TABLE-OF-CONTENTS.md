# FreeSWITCH Manual: Annotated Table of Contents

This is the chapter blueprint for the manual. Each chapter lists what it teaches
and the authoritative source files used to verify it. Paths under `conf/vanilla/`
and `src/` are relative to the FreeSWITCH repository root. Paths inside chapters
are written relative to the FreeSWITCH configuration root.

Scope and method are defined in [`README.md`](./README.md). Anything touching
internals, troubleshooting, or operations is excluded.

---

## Part I: Foundations

### Chapter 1: Introduction and Core Concepts
What FreeSWITCH is at the operator level, and the model the rest of the manual
assumes: the soft switch role, endpoints and channels, calls and bridges,
the XML registry and its sections, and the difference between configuration,
directory, and dialplan. Stops at the configuration model; no internals.

- Sources: `conf/vanilla/freeswitch.xml`, `conf/vanilla/README_IMPORTANT.txt`.

### Chapter 2: Getting Started
Baseline install to a working PBX. What the vanilla configuration provides out of
the box, starting FreeSWITCH, connecting to `fs_cli`, registering the bundled
1000-1019 test extensions with a softphone, and placing the first call. Tour of
the demo dialplan destinations (echo, milliwatt, conference, talking clock).

- Sources: `conf/vanilla/` (whole tree), `conf/vanilla/vars.xml`,
  `conf/vanilla/directory/default/1000.xml`,
  `conf/vanilla/dialplan/default.xml`, `conf/vanilla/dialplan/default/*.xml`.

---

## Part II: The Configuration System

### Chapter 3: The XML Configuration System
The single XML document model. The preprocessor and its instructions (`#include`,
`#set`, `#comment`), the `X-PRE-PROCESS` tag, `<include>` partials, the compiled
`freeswitch.xml.fsxml`, and the five top-level sections (`configuration`,
`dialplan`, `chatplan`, `directory`, `languages`). How `autoload_configs/*.xml`
is assembled.

- Sources: `conf/vanilla/freeswitch.xml`, `src/switch_xml.c` (preprocessor and
  section parsing), `src/switch_loadable_module.c`.

### Chapter 4: Global Variables and Core Settings
Preprocessor variables in `vars.xml` and the `$${var}` versus `${var}`
distinction. Dynamically calculated variables (`local_ip_v4`, `domain`,
`sound_prefix`, directory paths). Core runtime settings in `switch.conf.xml`:
the parameter table for `core-db-dsn`, `rtp-start-port`, `rtp-end-port`,
`max-sessions`, `sessions-per-second`, `dialplan-timestamps`, and the rest.

- Sources: `conf/vanilla/vars.xml`,
  `conf/vanilla/autoload_configs/switch.conf.xml`, `src/switch_core.c`.

### Chapter 5: Module Loading and Management
`modules.conf.xml` and the default load set, `pre_load_modules.conf.xml`,
`post_load_modules.conf.xml`, and runtime load/unload/reload from the CLI.
The module categories (applications, endpoints, codecs, formats, event handlers,
languages, say, dialplans, loggers, timers, asr_tts, databases, directories,
xml interfaces) and what category membership means for configuration.

- Sources: `conf/vanilla/autoload_configs/modules.conf.xml`,
  `conf/vanilla/autoload_configs/{pre_load_modules,post_load_modules}.conf.xml`,
  `src/mod/` (category directories).

---

## Part III: Users and Endpoints

### Chapter 6: The User Directory
The `directory` section: domains, users, groups. User `params` (notably
`password`, `vm-password`, `a1-hash`) and user `variables` (`user_context`,
`toll_allow`, `accountcode`, `effective_caller_id_*`, `outbound_caller_id_*`,
`callgroup`). Group membership and `groups`. How the directory backs SIP
authentication.

- Sources: `conf/vanilla/directory/default.xml`,
  `conf/vanilla/directory/default/*.xml`,
  `conf/vanilla/autoload_configs/directory.conf.xml`,
  `src/mod/applications/mod_directory`.

### Chapter 7: SIP Profiles with Sofia
`sofia.conf.xml` and the profile model: one user agent per IP and port. The
bundled `internal` (5060) and `external` (5080) profiles. Profile `settings`
reference tables (transport, `sip-port`, `context`, `dialplan`,
`auth-calls`, `apply-inbound-acl`, NAT options, codec strings, registration,
RTP and TLS options). Aliases and domains.

- Sources: `conf/vanilla/autoload_configs/sofia.conf.xml`,
  `conf/vanilla/sip_profiles/internal.xml`,
  `conf/vanilla/sip_profiles/external.xml`,
  `conf/vanilla/sip_profiles/*-ipv6.xml`,
  `src/mod/endpoints/mod_sofia` (`sofia.c`, `mod_sofia.c` for parameter parsing).

### Chapter 8: Gateways and Trunk Registration
Defining gateways inside a profile to register to an upstream provider. The
gateway parameter table (`username`, `password`, `realm`, `proxy`,
`register`, `expire-seconds`, `retry-seconds`, `caller-id-in-from`,
`contact-params`, transport). Inbound versus outbound trunk patterns and
selecting a gateway from the dialplan with `bridge`.

- Sources: `conf/vanilla/sip_profiles/external/example.xml`,
  `src/mod/endpoints/mod_sofia` (gateway parsing).

### Chapter 9: WebRTC with Verto
`verto.conf.xml`: the Verto profile parameters (`bind-local`, `force-register-*`,
`userauth`, `mcast-ip`, `rtp-ip`, `ext-rtp-ip`, `local-network`, codec strings,
TLS/WSS options). Pairing Verto with the user directory. The role of `mod_rtc`.

- Sources: `conf/vanilla/autoload_configs/verto.conf.xml`,
  `src/mod/endpoints/mod_verto`, `src/mod/endpoints/mod_rtc`.

### Chapter 10: WebRTC over SIP (WSS)
Enabling SIP over secure WebSocket in a Sofia profile (`ws-binding`,
`wss-binding`), TLS material, and the configuration relationship to SDP and
ICE/DTLS for browser endpoints. Configuration surface only.

- Sources: `conf/vanilla/sip_profiles/internal.xml` (ws/wss bindings),
  `src/mod/endpoints/mod_sofia`.

### Chapter 11: Other Endpoints
Brief configuration references for the additional bundled endpoints relevant to
operators: `mod_loopback`, `mod_skinny` (`skinny.conf.xml`, skinny profiles),
`mod_rtmp`, and `mod_alsa`. Each documents purpose and its configuration file.

- Sources: `conf/vanilla/autoload_configs/{skinny,rtmp,alsa}.conf.xml`,
  `conf/vanilla/skinny_profiles/`, `src/mod/endpoints/{mod_skinny,mod_rtmp,mod_alsa,mod_loopback}`.

---

## Part IV: Call Routing and the Dialplan

### Chapter 12: The XML Dialplan
The dialplan model from `mod_dialplan_xml`: contexts, extensions, conditions,
and actions/anti-actions. Field matching, regex expressions, capture references
(`$1`), `break` behavior, `continue`, recursion via `transfer`, and the
`default` and `public` contexts. The `user_context` link from the directory.

- Sources: `conf/vanilla/dialplan/default.xml`,
  `conf/vanilla/dialplan/public.xml`, `conf/vanilla/dialplan/features.xml`,
  `src/mod/dialplans/mod_dialplan_xml`.

### Chapter 13: Inbound Calls and the Public Context
How calls from the `external` profile land in `public`, the transfer into
`default`, caller ID handling, and DID routing patterns.

- Sources: `conf/vanilla/dialplan/public.xml`,
  `conf/vanilla/dialplan/public/*.xml`, `conf/vanilla/sip_profiles/external.xml`.

### Chapter 14: Dialplan Application Reference (mod_dptools)
Reference for the dialplan applications used to build call logic: `answer`,
`bridge`, `playback`, `play_and_get_digits`, `record`, `set`, `export`,
`hangup`, `transfer`, `sleep`, `echo`, `conference`, `voicemail`, `ivr`,
`hash`, `limit`, `lua`, and the rest of the set. Each entry: purpose, syntax,
and arguments.

- Sources: `src/mod/applications/mod_dptools/mod_dptools.c` (registered apps),
  `conf/vanilla/dialplan/*` (usage in context).

### Chapter 15: Time and Condition Routing
Time-of-day conditions (`year`, `mon`, `mday`, `wday`, `hour`,
`minute-of-day`, and the rest), nested conditions, and `toll_allow` based
restriction.

- Sources: `conf/vanilla/dialplan/default.xml` (time condition examples),
  `src/mod/dialplans/mod_dialplan_xml`.

---

## Part V: Media and Codecs

### Chapter 16: Codecs and Negotiation
The codec model: codec strings (`inbound-codec-prefs`, `outbound-codec-prefs`,
`absolute_codec_string`, `codec_string`), negotiation order, transcoding, and
`ptime`. Codec module reference table for the bundled codecs (Opus, G.711,
G.722, G.729, G.723.1, AMR, AMR-WB, iLBC, Siren, BroadVoice, Codec2, H.264,
VP8/VP9) including their config files where present.

- Sources: `src/mod/codecs/*`,
  `conf/vanilla/autoload_configs/{opus,amr,amrwb,av,vpx}.conf.xml`,
  `conf/vanilla/vars.xml` (global codec and SRTP suite settings).

### Chapter 17: Media Handling
Proxy media and bypass media, `media-option` settings on a profile, early media,
and the `inbound-late-negotiation` and `inbound-proxy-media` parameters. RTP and
SRTP configuration surface (`rtp_secure_media`, the `rtp_sdes_suites` global).

- Sources: `conf/vanilla/sip_profiles/internal.xml`,
  `conf/vanilla/vars.xml`, `src/mod/endpoints/mod_sofia`.

### Chapter 18: Audio Files and Streaming Sources
Playable sources and the file format modules: `mod_sndfile`, `mod_native_file`,
`mod_local_stream` (`local_stream.conf.xml` and music on hold),
`mod_tone_stream` (the TGML tone generator), and `mod_shout` for MP3 and Icecast.
The `sound_prefix` and `hold_music` variables.

- Sources: `conf/vanilla/autoload_configs/local_stream.conf.xml`,
  `conf/vanilla/vars.xml`,
  `src/mod/formats/{mod_sndfile,mod_local_stream,mod_tone_stream,mod_shout}`.

---

## Part VI: Applications and Features

### Chapter 19: Voicemail
`voicemail.conf.xml`: profiles, the parameter table (`file-extension`,
`max-record-len`, `play-greeting`, `vm-password`, storage paths, email options),
the `voicemail` application, and the directory link via `vm-password`. Email
notification templates.

- Sources: `conf/vanilla/autoload_configs/voicemail.conf.xml`,
  `conf/vanilla/voicemail.tpl`, `conf/vanilla/notify-voicemail.tpl`,
  `src/mod/applications/mod_voicemail`.

### Chapter 20: Conferencing
`conference.conf.xml` profiles and parameters, `conference_layouts.conf.xml` for
video layouts, the `conference` application, and the bundled conference dialplan
entries.

- Sources: `conf/vanilla/autoload_configs/conference.conf.xml`,
  `conf/vanilla/autoload_configs/conference_layouts.conf.xml`,
  `src/mod/applications/mod_conference`.

### Chapter 21: IVR Menus
`ivr.conf.xml` and the `ivr_menus/` directory. Menu parameters (`greet-long`,
`greet-short`, `invalid-sound`, `timeout`, `max-failures`, `digit-len`),
entries, and nesting. The `ivr` application.

- Sources: `conf/vanilla/autoload_configs/ivr.conf.xml`,
  `conf/vanilla/ivr_menus/*.xml`, `src/mod/applications/mod_dptools` (ivr app).

### Chapter 22: Queues: FIFO and Call Center
`fifo.conf.xml` and the `fifo` application for simple queues, and
`callcenter.conf.xml` (`mod_callcenter`) for queues, agents, and tiers.
Parameter reference for both.

- Sources: `conf/vanilla/autoload_configs/fifo.conf.xml`,
  `conf/vanilla/autoload_configs/callcenter.conf.xml`,
  `src/mod/applications/{mod_fifo,mod_callcenter}`.

### Chapter 23: Utility Applications
Operator-facing utility modules: `mod_db` and `mod_hash` (`db.conf.xml`,
`hash.conf.xml`) for limits and state, `mod_limit`/`mod_db` call limiting,
`mod_valet_parking` (call parking), `mod_esf` (paging/multicast), `mod_fsv`
(recording), and `mod_spy`. Purpose and configuration per module.

- Sources: `conf/vanilla/autoload_configs/{db,hash}.conf.xml`,
  `src/mod/applications/{mod_db,mod_hash,mod_limit,mod_valet_parking,mod_esf,mod_fsv,mod_spy}`.

### Chapter 24: Fax and T.38
`mod_spandsp` configuration (`spandsp.conf.xml`): `txfax`/`rxfax`, T.38 gateway
options, and the related profile settings. Configuration surface only.

- Sources: `conf/vanilla/autoload_configs/spandsp.conf.xml`,
  `src/mod/applications/mod_spandsp`.

---

## Part VII: Integration and Control

### Chapter 25: The Event Socket
`event_socket.conf.xml`: `listen-ip`, `listen-port`, `password`, `apply-inbound-acl`,
`nat-map`. Inbound versus outbound socket modes as configured, and the dialplan
`socket` application. ESL is presented as a configured interface, not an API to
program.

- Sources: `conf/vanilla/autoload_configs/event_socket.conf.xml`,
  `src/mod/event_handlers/mod_event_socket`.

### Chapter 26: Dynamic Configuration with XML Curl
`xml_curl.conf.xml`: binding the `configuration`, `directory`, and `dialplan`
sections to an HTTP backend. Binding parameters (`gateway-url`, `gateway-credentials`,
`bindings`, `method`). Configuration surface for serving XML dynamically.

- Sources: `conf/vanilla/autoload_configs/xml_curl.conf.xml`,
  `src/mod/xml_int/mod_xml_curl`.

### Chapter 27: Call Detail Records
CDR configuration: `cdr_csv.conf.xml` (templates, legs, rotation),
`xml_cdr.conf.xml` (HTTP POST of XML records), and `cdr_sqlite.conf.xml`.
Parameter tables and the default CSV template.

- Sources: `conf/vanilla/autoload_configs/{cdr_csv,xml_cdr,cdr_sqlite}.conf.xml`,
  `src/mod/event_handlers/{mod_cdr_csv,mod_xml_cdr,mod_cdr_sqlite}`.

### Chapter 28: Scripting Integration
Wiring embedded scripting through configuration: `lua.conf.xml` and the
`script_dir`, calling scripts from the dialplan with the `lua` application, and
the equivalent configuration entry points for the other language modules. Focused
on configuration and invocation, not language APIs.

- Sources: `conf/vanilla/autoload_configs/lua.conf.xml`,
  `src/mod/languages/mod_lua`, `conf/vanilla/vars.xml` (`script_dir`).

### Chapter 29: Access Control Lists
`acl.conf.xml`: defining named lists, `node` entries (`cidr`, `domain`,
`allow`/`deny`), the default-policy, and applying a list with `apply-inbound-acl`
on a profile or the Event Socket. Documented as configuration, not hardening.

- Sources: `conf/vanilla/autoload_configs/acl.conf.xml`,
  `src/mod/endpoints/mod_sofia` (acl application).

### Chapter 30: SignalWire Connectivity
`signalwire.conf.xml` and `mod_signalwire`: connecting a FreeSWITCH instance to
the SignalWire platform, the configuration parameters, and what the connection
exposes. Configuration surface only.

- Sources: `conf/vanilla/autoload_configs/signalwire.conf.xml`,
  `src/mod/applications/mod_signalwire`.

---

## Part VIII: Reference

### Chapter 31: CLI and API Command Reference
`fs_cli` connection (`event_socket.conf.xml`) and a reference for the core API
commands exposed by `mod_commands` that operators use from the console
(`reloadxml`, `sofia status`, `show`, `originate`, `uuid_*`, `reload`,
`status`). Reference entries: command, purpose, syntax.

- Sources: `src/mod/applications/mod_commands/mod_commands.c` (registered APIs),
  `conf/vanilla/autoload_configs/event_socket.conf.xml`.

### Chapter 32: Channel Variables Catalog
A re-verified reference of channel variables grouped by subsystem (call control,
SIP, RTP/media, codec, recording, voicemail, CDR). Carried forward from the legacy
catalog and checked against source.

- Sources: legacy `../freeswitch-docs/docs/Channel-Variables-Catalog/`,
  `src/include/switch_types.h`, module sources that set each variable.

### Appendix A: The Vanilla Configuration Map
A file-by-file map of `conf/vanilla/`: what each file and directory configures
and which chapter documents it.

- Sources: `conf/vanilla/` (whole tree).

### Appendix B: Codec Reference Table
A consolidated table of bundled codecs: name, module, sample rates, typical
`ptime`, and config file where one exists.

- Sources: `src/mod/codecs/*`.

### Appendix C: Glossary
Concise definitions of the terms used in the manual (channel, leg, bridge,
profile, context, gateway, registration, SDP, transcoding, proxy media).

- Sources: derived from the chapters above.
