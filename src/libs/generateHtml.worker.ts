import * as babel from "@babel/standalone";

import pluginPluginReplaceImport from "babel-plugin-replace-import";

export async function generateHtml(html: string, js: string): Promise<string> {
  const result = babel.transform(js, {
    plugins: [
      [
        pluginPluginReplaceImport,
        {
          src: /^(.+)$/,
          dest: "https://cdn.skypack.dev/$1",
        },
      ],
    ],
  });

  // TODO: minify
  return `
  <!DOCTYPE html>
  <head>
    <title>iframe</title>
    <meta charset="utf8" />
  </head>
  <body>
    ${html}
    <script type="module">
      ${result?.code}
    </script>
  </body>
  `;
}
