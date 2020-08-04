import { FunctionalComponent, h } from 'preact';
import { styled } from 'goober';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'preact/hooks';

import { htmlCodeState, jsCodeState } from '../atoms/code';
import { generateHtml } from '../libs/generateHtml.worker';

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
  const [generatedHtml, setGeneratedHtml] = useState('');

  useEffect(() => {
    const f = async () => {
      setGeneratedHtml(await generateHtml(htmlCode, jsCode));
    };
    f();
  }, [htmlCode, jsCode]);

  return <StyledIFrame srcDoc={generatedHtml} />;
};

export default Preview;
