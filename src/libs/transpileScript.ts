import * as babel from '@babel/standalone';

import pluginPluginReplaceImport from 'babel-plugin-replace-import';

export async function transpileScript(code: string): Promise<string> {
  const result = babel.transform(code, {
    plugins: [
      [
        pluginPluginReplaceImport,
        {
          src: /^(.+)$/,
          dest: 'https://cdn.skypack.dev/$1',
        },
      ],
    ],
  });

  if (result?.code == null) throw Error('Babel returns nothing.');

  return result.code;
}
