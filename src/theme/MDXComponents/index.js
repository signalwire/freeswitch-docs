import React from "react";
// Import the original mapper
import MDXComponents from "../MDXComponentsOriginal/index";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import { Language, LangItem } from "../../components/Language/Language";
import LangSwitch from "../../components/Language/LangSwitch";

export default {
  ...MDXComponents,

  Language,
  LangItem,
  LangSwitch,

  Tabs,
  TabItem,
};
