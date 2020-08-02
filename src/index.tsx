import { h, render } from 'preact';
import { RecoilRoot } from 'recoil';
import { setup } from 'goober';

import App from './components/App';

setup(h);

render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.querySelector('.root')!
);
