import path from "path";
import fs from "fs";
import renderRulesTableContent from "./render-rules";

const insertText = `\n${renderRulesTableContent({
  buildRulePath: (name) =>
    `https://ota-meshi.github.io/eslint-plugin-css/rules/${name}.html`,
})}\n`;

const readmeFilePath = path.resolve(__dirname, "../README.md");
const newReadme = fs
  .readFileSync(readmeFilePath, "utf8")
  .replace(
    /<!--RULES_TABLE_START-->[\s\S]*<!--RULES_TABLE_END-->/u,
    `<!--RULES_TABLE_START-->${insertText.replace(
      /\$/gu,
      "$$$$"
    )}<!--RULES_TABLE_END-->`
  );
fs.writeFileSync(readmeFilePath, newReadme);

const docsReadmeFilePath = path.resolve(__dirname, "../docs/README.md");

fs.writeFileSync(
  docsReadmeFilePath,
  newReadme
    .replace("# eslint-plugin-css\n", "# Introduction\n")
    .replace(/.\/docs\//gu, "./")
    .replace(
      /<!--RULES_SECTION_START-->[\s\S]*<!--RULES_SECTION_END-->/u,
      "See [Available Rules](./rules/README.md)."
    )
    .replace(
      /<!--USAGE_SECTION_START-->[\s\S]*<!--USAGE_SECTION_END-->/u,
      "See [User Guide](./user-guide/README.md)."
    )
    .replace(/<!--DOCS_IGNORE_START-->[\s\S]*?<!--DOCS_IGNORE_END-->/gu, "")
    .replace(
      // eslint-disable-next-line regexp/no-super-linear-backtracking -- it's acceptable here
      /\(https:\/\/ota-meshi.github.io\/eslint-plugin-css(?<paths>.*?)(?<name>[^/]*\.html)?\)/gu,
      (_ptn, paths, name) => {
        let result = `(.${paths}`;
        if (name) {
          result +=
            name === "index.html"
              ? "README.md"
              : name.replace(/\.html$/u, ".md");
        } else {
          result += "README.md";
        }
        result += ")";
        return result;
      }
    )
    .replace(/\n{3,}/gu, "\n\n")
);

const userGuideReadmeFilePath = path.resolve(
  __dirname,
  "../docs/user-guide/README.md"
);
const newUserGuideReadme = fs
  .readFileSync(userGuideReadmeFilePath, "utf8")
  .replace(
    /<!--USAGE_SECTION_START-->[\s\S]*<!--USAGE_SECTION_END-->/u,
    /<!--USAGE_SECTION_START-->[\s\S]*<!--USAGE_SECTION_END-->/u.exec(
      newReadme
    )![0]
  );

fs.writeFileSync(
  userGuideReadmeFilePath,
  newUserGuideReadme
    .replace(/\(#white_check_mark-rules\)/gu, "(../rules/README.md)")
    .replace(
      // eslint-disable-next-line regexp/no-super-linear-backtracking -- it's acceptable here
      /\(https:\/\/ota-meshi.github.io\/eslint-plugin-css(?<paths>.*?)(?<name>[^/]*\.html)?(?<hash>#.*?)?\)/gu,
      (_ptn, paths, name, hash) => {
        let result = `(..${paths}`;
        if (name) {
          result +=
            name === "index.html"
              ? "README.md"
              : name.replace(/\.html$/u, ".md");
        } else {
          result += "README.md";
        }
        result += `${hash || ""})`;
        return result;
      }
    )
    .replace(/\n{3,}/gu, "\n\n")
);
