import React from "react";
import MDXContent from "@theme/MDXContent";
import useLanguageChoice from "./useLanguageChoice";
import { useEffect } from "react";
import { useState } from "react";

export function Language({ groupId, children }) {
  const { lang } = useLanguageChoice(groupId);
  const [selChildIdx, setSelChildIdx] = useState(0);

  useEffect(() => {
    setSelChildIdx(
      React.Children.toArray(children).findIndex((child) => child?.props.value === lang)
    );
  }, [lang, children]);

  let childrenArray = React.Children.toArray(children);

  if (selChildIdx >= 0) return <MDXContent>{childrenArray[selChildIdx]}</MDXContent>;
  else if (childrenArray[0] !== undefined)
    return <MDXContent>{childrenArray[0]}</MDXContent>;

  return null;
}

export function LangItem({ value = "none", children }) {
  return <MDXContent>{children}</MDXContent>;
}
