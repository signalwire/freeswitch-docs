import React from "react";
import useLanguageChoice from "./useLanguageChoice";
import { useHistory } from "@docusaurus/router";

export default function LangSwitch({ groupId, groupIds = [] }) {
  const { lang } = useLanguageChoice(groupId);
  const history = useHistory();

  const langLabel = (l) =>
    typeof l === "object" ? l?.label ?? l?.value ?? "Unknown" : l;
  const langValue = (l) => (typeof l === "object" ? l?.value ?? "Unknown" : l);

  return (
    <>
      <select
        style={{
         padding: "4px 30px 4px 20px"
        }}
        onChange={(e) => {
          const params = new URLSearchParams({
            [groupId]: e.target.value?.toLocaleLowerCase(),
          });
          history.replace({ pathname: location.pathname, search: params.toString() });
        }}
        value={lang ?? undefined}
      >
        {groupIds?.map((l) => (
          <option key={langValue(l)} value={langValue(l)}>
            {langLabel(l)}
          </option>
        ))}
      </select>
    </>
  );
}
