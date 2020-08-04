import * as babel from '@babel/standalone';

export interface TranspileScriptOption {
  babelPlugins: BabelPlugin[];
}

export interface BabelPlugin {
  name: string;
  options?: any;
}

export async function transpileScript(
  code: string,
  option: TranspileScriptOption
): Promise<string> {
  const plugins = await Promise.all(
    option.babelPlugins.map((p) => importBabelPlugin(p))
  );
  const result = babel.transform(code, {
    plugins: plugins,
  });

  if (result?.code == null) throw Error('Babel returns nothing.');

  return result.code;
}

async function importBabelPlugin(plugin: BabelPlugin): Promise<[any, any?]> {
  const instance = await import(
    /* webpackIgnore: true */ 'https://cdn.skypack.dev/' + plugin.name
  );

  return [instance, plugin.options];
}
