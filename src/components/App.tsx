import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useRecoilValue } from 'recoil';
import Editor from './Editor';
import { generateHtml } from '../libs/generateHtml.worker';
import { jsCodeState } from '../atoms/code';
import * as monaco from 'monaco-editor';
import { styled } from 'goober';

const FlexContainer = styled('div')`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const FlexItem = styled('div')`
  flex: 1 0 50%;
  height: 100%;
`;

const StyledIFrame = styled('iframe')`
  height: 100%;
  width: 100%;
  border: 0;
  overflow-y: scroll;
  overflow-x: scroll;
`;

const initialModel = monaco.editor.createModel(
  `
import React  from "react";
import ReactDOM from "react-dom";

const element = React.createElement("div", {}, "rendered by React in iframe");
ReactDOM.render(element, document.getElementById("iframe-root"));
`,
  'javascript'
);

export default function App() {
  const jsCode = useRecoilValue(jsCodeState);
  const [generatedHtml, setGeneratedHtml] = useState('');

  useEffect(() => {
    const f = async () => {
      setGeneratedHtml(await generateHtml(jsCode));
    };
    f();
  }, [jsCode]);

  return (
    <FlexContainer>
      <FlexItem>
        <Editor atom={jsCodeState} monacoModel={initialModel} />
      </FlexItem>
      <FlexItem>
        <StyledIFrame srcDoc={generatedHtml} />
      </FlexItem>
    </FlexContainer>
  );
}
