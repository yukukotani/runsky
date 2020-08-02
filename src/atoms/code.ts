import { atom } from 'recoil';

const initialHtmlCode = `<div id="root" />`;

const initialJsCode = `import React  from "react";
import ReactDOM from "react-dom";

const element = React.createElement("div", {}, "rendered by React in iframe");
ReactDOM.render(element, document.getElementById("root"));`;

export const htmlCodeState = atom({
  key: 'htmlCodeState',
  default: initialHtmlCode,
});

export const jsCodeState = atom({
  key: 'jsCodeState',
  default: initialJsCode,
});
