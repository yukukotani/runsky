import { h, render } from "preact";

import App from "./components/App";
import { RecoilRoot } from "recoil";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<RecoilRoot><App /></RecoilRoot>, document.querySelector(".root")!);
