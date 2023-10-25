declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classnames: IClassNames;
    export = classnames;
}

declare module "*.png";
// declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
  }

declare const __IS_DEV__: boolean; 