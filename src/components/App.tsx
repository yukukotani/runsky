import { h } from "preact";

const html = `
<!DOCTYPE html>
<head>
  <title>iframe</title>
  <meta charset="utf8" />
</head>
<body>
  <div id="iframe-root"></div>
  <script type="module">
    import React from 'https://cdn.skypack.dev/react';
    import ReactDOM from 'https://cdn.skypack.dev/react-dom';

    const el = React.createElement('div', {}, 'in the iframe');
    ReactDOM.render(el, document.getElementById('iframe-root'));
  </script>
</body>

`;

export default function App() {
  return (
    <div>
      <div>out of iframe</div>
      <iframe srcDoc={html} />
    </div>
  );
}
