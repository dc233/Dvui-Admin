import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
    shortcuts: [],
    rules: [[/^f-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })]],
    theme: {},
    presets: [presetUno()],
});
