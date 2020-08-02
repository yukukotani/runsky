import { atom } from "recoil";

const initialJsCode = `
import React  from "react";
import ReactDOM from "react-dom";

const element = React.createElement("div", {}, "rendered by React in iframe");
ReactDOM.render(element, document.getElementById("iframe-root"));
`;


export const jsCodeState = atom({
  key: 'textState',
  default: initialJsCode, 
});