export function generateHtml(js: string): string {
  // TODO: minify
  return `
  <!DOCTYPE html>
  <head>
    <title>iframe</title>
    <meta charset="utf8" />
  </head>
  <body>
    <div id="iframe-root"></div>
    <script type="module">
      ${js}
    </script>
  </body>
  `;
}
