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
  overflow: scroll;
`;

const ErrorContainer = styled('div')`
  height: 100%;
  width: 100%;
  color: red;
  white-space: pre;
  padding: 8px;
  overflow: scroll;
`;

const Preview: FunctionalComponent = () => {
  const htmlCode = useRecoilValue(htmlCodeState);
  const jsCode = useRecoilValue(jsCodeState);
  const [transpiledJsCode, setTranspiledJsCode] = useState('');
  const [transpileError, setTranspileError] = useState<string | null>(null);

  useEffect(() => {
    const f = async () => {
      try {
        const transpiled = await transpileScript(jsCode);
        setTranspiledJsCode(transpiled);
        setTranspileError(null);
      } catch (error) {
        setTranspileError(error.message);
      }
    };
    f();
  }, [jsCode]);

  const iFrameSource = useMemo(() => {
    return generateIframeSource(htmlCode, transpiledJsCode);
  }, [htmlCode, transpiledJsCode]);

  return transpileError ? (
    <ErrorContainer>{transpileError}</ErrorContainer>
  ) : (
    <StyledIFrame srcDoc={iFrameSource} />
  );
};

export default Preview;
