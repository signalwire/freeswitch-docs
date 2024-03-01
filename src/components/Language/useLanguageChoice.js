import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "@docusaurus/router";

// Checks first the URL, then localStorage to see
// if the user prefers a particular language
// updates the localStorage in case URL has a valid groupid
// updates the URL if it was empty to match localStorage preference
export default function useLanguageChoice(groupId) {
  const [lang, setLang] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (typeof groupId !== "string" || groupId === "") return;
    const queryParams = new URLSearchParams(location.search);
    const fromQuery = queryParams.get(groupId)?.toLocaleLowerCase() ?? null;

    // we use the same localStorage key used by the tabs
    const fromLocalStorage =
      window.localStorage.getItem(`docusaurus.tab.${groupId}`)?.toLocaleLowerCase() ??
      null;

    if (fromQuery === null) {
      setLang(fromLocalStorage);
      if (fromLocalStorage !== null) {
        queryParams.set(groupId, fromLocalStorage);
        history.replace({ pathname: location.pathname, search: queryParams.toString() });
      }
    } else {
      setLang(fromQuery);
      window.localStorage.setItem(`docusaurus.tab.${groupId}`, fromQuery);
    }
  }, [groupId, location, history]);
  return { lang };
}
