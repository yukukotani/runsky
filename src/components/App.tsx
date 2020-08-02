import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useRecoilValue } from 'recoil';
import Editor from './Editor';
import { generateHtml } from '../libs/generateHtml.worker';
import { jsCodeState } from '../atoms/code';
import * as monaco from 'monaco-editor';

const wrapperStyle = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
};

const flexChildStyle = {
  flex: '1 0 50%',
};

const childStyle = {
  width: '100%',
  height: '100%',
  padding: 0,
  margin: 0,
  overflowY: 'scroll',
  overflowX: 'scroll',
};

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
    <div style={wrapperStyle}>
      <div style={flexChildStyle}>
        <Editor
          style={childStyle}
          atom={jsCodeState}
          monacoModel={initialModel}
        />
      </div>
      <div style={flexChildStyle}>
        <iframe style={childStyle} srcDoc={generatedHtml} />
      </div>
    </div>
  );
}
