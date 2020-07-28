import { h, render } from "preact";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<div>Rendered from React</div>, document.querySelector(".root")!);
