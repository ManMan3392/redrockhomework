// markdown-loader.js
import { marked } from "marked";
import hljs from "highlight.js";

export default function (source) {
  this.cacheable && this.cacheable();

  marked.setOptions({
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
    langPrefix: "hljs language-",
  });

  const html = marked(source);

  return `export default ${JSON.stringify(html)}`;
}
