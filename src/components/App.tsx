import { h } from "preact";
import {  useEffect, useState } from "preact/hooks";
import {
  useRecoilValue,
} from 'recoil';
import Editor from "./Editor";
import { generateHtml } from "../libs/generateHtml.worker";
import { jsCodeState } from "../atoms/code";

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
  const jsCode = useRecoilValue(jsCodeState)
  const [generatedHtml, setGeneratedHtml] = useState("")

  useEffect(() => {
    const f = async () => {
      setGeneratedHtml(await generateHtml(jsCode));
    };
    f();
  }, [jsCode]);

  return (
      <div style={wrapperStyle}>
        <div style={flexChildStyle}>
          <Editor style={childStyle} atom={jsCodeState}/>
        </div>
        <div style={flexChildStyle}>
          <iframe style={childStyle} srcDoc={generatedHtml} />
        </div>
      </div>
  );
}
