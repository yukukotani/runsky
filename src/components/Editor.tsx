import { h, FunctionalComponent } from 'preact';
import { RecoilState, useRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'preact/hooks';

import * as monaco from 'monaco-editor';
import { css } from 'goober';

declare const ResizeObserver: any;

const EditorStyleClass = css`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

interface Props {
  atom: RecoilState<string>;
  monacoModel: monaco.editor.ITextModel;
}

const Editor: FunctionalComponent<Props> = ({ atom, monacoModel }) => {
  const [code, setCode] = useRecoilState(atom);

  const ref = useRef<HTMLDivElement>(null);
  const [
    editor,
    setEditor,
  ] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (ref.current) {
      const editor = monaco.editor.create(ref.current, {
        value: code,
        model: monacoModel,
        fontSize: 18,
        theme: 'vs-dark',
        minimap: {
          enabled: false,
        },
      });
      setEditor(editor);
      editor.layout();
      const resizeObserver = new ResizeObserver(() => {
        editor.layout();
      });
      resizeObserver.observe(ref.current);
      return () => resizeObserver.unobserve(ref.current);
    }
  }, [ref]);
  useEffect(() => {
    if (editor) {
      editor.setModel(monacoModel);
      monacoModel.onDidChangeContent(() => {
        setCode(editor.getValue());
      });
    }
  }, [editor, monacoModel]);

  return <div ref={ref} class={EditorStyleClass} />;
};

export default Editor;
