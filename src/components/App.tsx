import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useRecoilValue } from 'recoil';
import Editor from './Editor';
import { generateHtml } from '../libs/generateHtml.worker';
import { jsCodeState, htmlCodeState } from '../atoms/code';
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

const EditorTabs = styled('div')`
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: rgb(50, 50, 50);
  display: flex;
  color: white;

  div {
    height: 100%;
    padding: 0 12px;
  }

  div.active {
    background-color: rgb(30, 30, 30);
  }
`;

const tabs = [
  {
    name: 'HTML',
    model: monaco.editor.createModel('', 'html'),
    atom: htmlCodeState,
  },
  {
    name: 'JavaScript',
    model: monaco.editor.createModel('', 'javascript'),
    atom: jsCodeState,
  },
];

export default function App() {
  const htmlCode = useRecoilValue(htmlCodeState);
  const jsCode = useRecoilValue(jsCodeState);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    const f = async () => {
      setGeneratedHtml(await generateHtml(htmlCode, jsCode));
    };
    f();
  }, [htmlCode, jsCode]);

  return (
    <FlexContainer>
      <FlexItem>
        <EditorTabs>
          {tabs.map((tab) => (
            <div
              onClick={() => setActiveTab(tab)}
              className={activeTab.name === tab.name ? 'active' : ''}
            >
              {tab.name}
            </div>
          ))}
        </EditorTabs>
        <Editor atom={activeTab.atom} monacoModel={activeTab.model} />
      </FlexItem>
      <FlexItem>
        <StyledIFrame srcDoc={generatedHtml} />
      </FlexItem>
    </FlexContainer>
  );
}
