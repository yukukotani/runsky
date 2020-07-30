import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Editor from "./Editor";
import { generateHtml } from "../libs/generateHtml.worker";

const defaultInput = `
import React  from "react";
import ReactDOM from "react-dom";

const element = React.createElement("div", {}, "rendered by React in iframe");
ReactDOM.render(element, document.getElementById("iframe-root"));
`;

const wrapperStyle = {
  display: "flex",
  width: "100vw",
  height: "100vh",
};

const flexChildStyle = {
  flex: "1 0 50%",
};

const childStyle = {
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
  overflowY: "scroll",
  overflowX: "scroll",
};

export default function App() {
  const [js, setJs] = useState<string>(defaultInput);
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const f = async () => {
      setSrc(await generateHtml(js));
    };
    f();
  });

  return (
    <div style={wrapperStyle}>
      <div style={flexChildStyle}>
        <Editor style={childStyle} text={js} setText={setJs} />
      </div>
      <div style={flexChildStyle}>
        <iframe style={childStyle} srcDoc={src} />
      </div>
    </div>
  );
}
