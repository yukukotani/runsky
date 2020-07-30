import { h, FunctionalComponent } from "preact";

interface Props {
  style: any;
  text: string;
  setText: (text: string) => void;
}

const Editor: FunctionalComponent<Props> = ({ style, text, setText }) => {
  return (
    <textarea
      style={style}
      value={text}
      onInput={(e) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setText((e.target as any).value);
      }}
    ></textarea>
  );
};

export default Editor;
