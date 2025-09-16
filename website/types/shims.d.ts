// Minimal shims to satisfy TypeScript without installing @types packages
declare module 'next/head' {
  const Head: any;
  export default Head;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'react' {
  export const useState: any;
  const React: any;
  export default React;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
