declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

type CSSModuleClasses = { readonly [key: string]: string };

declare module '*.module.scss' {
    const classes: CSSModuleClasses;
    export default classes;
}

declare module '*.svg';
declare module '*.webp';
