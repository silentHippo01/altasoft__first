import { BuildOptions } from "./types/config";
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {
        mode,
        paths,
        isDev
    } = options;

    return {
        mode,
        entry: paths.entry, //точка входа
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            assetModuleFilename: 'assets/[name][ext]'
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
          },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}