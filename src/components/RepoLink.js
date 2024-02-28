import React from "react";
/*
If something like Jira -> GitHub happens again, this should make it easier.
*/
const DEFAULT_REF = 'v1.10.11';
const REPO_URL = "https://github.com/signalwire/freeswitch";

const baseUrl = (ref) => `${REPO_URL}/tree/${ref}`;

const maybeFixPath = (path) => path.startsWith("/") ? path : "/" + path;

const repoUrl = (path, ref) => {
  const r = ref ? ref : DEFAULT_REF;
  
  if (path) {
    return baseUrl(r) + maybeFixPath(path);
  } else {
    return baseUrl(r);
  }
}

export default function RepoLink ({ path, ref, children }) {
  const href = repoUrl(path, ref);
  return (
    <a href={href} target="_blank">{children}</a>
  );
}