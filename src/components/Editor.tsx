import { h, FunctionalComponent } from "preact";

interface Props {
  text: string;
  setText: (text: string) => void;
}

const Editor: FunctionalComponent<Props> = ({ text, setText }) => {
  return (
    <textarea
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        resize: "none",
      }}
      value={text}
      onInput={(e) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setText((e.target as any).value);
      }}
    >
    </textarea>
  );
};

export default Editor;
