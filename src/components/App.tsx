import { h } from "preact";
import { useState } from "preact/hooks";
import Editor from "./Editor";
import { generateHtml } from "../libs/generateHtml";

const wrapperStyle = {
  display: "flex",
  width: "100vw",
  height: "100vh",
};

const flexChildStyle = {
  flexGrow: "1",
};

export default function App() {
  const [src, setSrc] = useState<string>("");

  return (
    <div style={wrapperStyle}>
      <div style={flexChildStyle}>
        <Editor text={src} setText={setSrc} />
      </div>
      <div style={flexChildStyle}>
        <iframe
          style={{
            width: "100%",
            height: "100%",
            padding: 0,
          }}
          srcDoc={generateHtml(src)}
        />
      </div>
    </div>
  );
}
