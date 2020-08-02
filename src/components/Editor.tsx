import { h, FunctionalComponent } from 'preact';
import { RecoilState, useRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'preact/hooks';

import * as monaco from 'monaco-editor';

declare const ResizeObserver: any;

interface Props {
  style: any;
  atom: RecoilState<string>;
  monacoModel: monaco.editor.ITextModel;
}

const Editor: FunctionalComponent<Props> = ({ style, atom, monacoModel }) => {
  const [, setCode] = useRecoilState(atom);

  const ref = useRef<HTMLDivElement>(null);
  const [
    editor,
    setEditor,
  ] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (ref.current) {
      const editor = monaco.editor.create(ref.current, {
        model: monacoModel,
        fontSize: 18,
        theme: 'vs-dark',
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
  }, [monacoModel]);

  return <div ref={ref} style={style} />;
};

export default Editor;
