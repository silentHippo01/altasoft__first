import webpack from "webpack";
//@ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
                    },
                }
            },
            'sass-loader',
        ]
    }

    //конфликтует с svgrLoader, если не убрать svg из регулярного выражения
    const assetsLoaderImages = {
        test: /\.(jpg|png|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
            filename: 'assets/images/[name][ext]'
        }
    }

    const assetsLoaderFonts = {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
            filename: 'assets/fonts/[name][ext]'
        }
    }

    const svgrLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }

    return [
        assetsLoaderImages,
        assetsLoaderFonts,
        svgrLoader,
        typescriptLoader,
        cssLoader,
    ]
}