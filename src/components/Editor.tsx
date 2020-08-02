import { h, FunctionalComponent } from 'preact';
import { RecoilState, useRecoilState } from 'recoil';

interface Props {
  style: any;
  atom: RecoilState<string>;
}

const Editor: FunctionalComponent<Props> = ({ style, atom }) => {
  const [code, setCode] = useRecoilState(atom);

  return (
    <textarea
      style={style}
      value={code}
      onInput={(e) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCode((e.target as any).value);
      }}
    ></textarea>
  );
};

export default Editor;
