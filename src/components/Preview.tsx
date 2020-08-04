import { FunctionalComponent, h } from 'preact';
import { styled } from 'goober';
import { useRecoilValue } from 'recoil';
import { useState, useEffect, useMemo } from 'preact/hooks';

import { htmlCodeState, jsCodeState } from '../atoms/code';
import { transpileScript } from '../libs/transpileScript';

function generateIframeSource(html: string, js: string) {
  return `
  <!DOCTYPE html>
  <head>
    <title>iframe</title>
    <meta charset="utf8" />
  </head>
  <body>
    ${html}
    <script type="module">
      ${js}
    </script>
  </body>
  `;
}

const StyledIFrame = styled('iframe')`
  height: 100%;
  width: 100%;
  border: 0;
  overflow-y: scroll;
  overflow-x: scroll;
`;

const Preview: FunctionalComponent = () => {
  const htmlCode = useRecoilValue(htmlCodeState);
  const jsCode = useRecoilValue(jsCodeState);
  const [transpiledJsCode, setTranspiledJsCode] = useState('');

  useEffect(() => {
    const f = async () => {
      setTranspiledJsCode(await transpileScript(jsCode));
    };
    f();
  }, [jsCode]);

  const iFrameSource = useMemo(() => {
    return generateIframeSource(htmlCode, transpiledJsCode);
  }, [htmlCode, transpiledJsCode]);

  return <StyledIFrame srcDoc={iFrameSource} />;
};

export default Preview;
