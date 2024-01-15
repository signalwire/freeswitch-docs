import generateCauseCodeMarkdownTable from "./q850_to_sip.mjs";

/* Autogenerator tasks
 * For generating documentation programmatically.
 **/
const prebuildFunctions = [
    generateCauseCodeMarkdownTable
];

prebuildFunctions.forEach((fn) => fn());
