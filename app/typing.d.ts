declare namespace JSX {
  interface IntrinsicElements {
    "lord-icon": any;
  }
}

declare module "@babel/core" {
  export function transform(
    file: any,
    options: { plugins: any; presets: any }
  ): {
    code: string;
  };
}
