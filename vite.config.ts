import { defineConfig, splitVendorChunkPlugin } from 'vite';
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import {
    createStyleImportPlugin,
    ElementPlusResolve as ElementstylePlusResolve,
    VxeTableResolve,
} from 'vite-plugin-style-import';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'; // 拆包策略
import progress from 'vite-plugin-progress'; // 打包进度条‘
//import viteImagemin from 'vite-plugin-imagemin'; // 图片压缩
import removeConsole from 'vite-plugin-remove-console'; // 生产环境去除console.log
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // 引用svg图标
import UnoCSS from 'unocss/vite'; // 原子化CSS
// import VueDevTools from 'vite-plugin-vue-devtools';
const path = require('path');

// https://vitejs.dev/config/;

export default defineConfig(({ command }): UserConfig => {
    const isBuild = command === 'build';
    // 静态资源后缀名匹配
    // const pictureSuffix =
    //     /\jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg$/;
    return {
        base: isBuild ? '/' : '/',
        resolve: {
            //设置别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '~': path.resolve(process.cwd()),
                '@image': path.resolve(__dirname, 'src/assets/img/'),
            },
        },
        plugins: [
            // VueDevTools(),
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        // 自动引入修改主题色添加这一行，使用预处理样式
                        importStyle: 'sass',
                        directives: true,
                        version: '2.3.6',
                    }),
                ],
            }),
            createStyleImportPlugin({
                resolves: [ElementstylePlusResolve(), VxeTableResolve()],
                libs: [
                    {
                        libraryName: 'element-plus',
                        esModule: true,
                        // 按需引入 css
                        resolveStyle: (name) => {
                            return `element-plus/theme-chalk/${name}.css`;
                        },
                    },
                ],
            }),
            //  分模块打包
            splitVendorChunkPlugin(),
            // steup 组件命名
            VueSetupExtend(),
            // 解析jsx语法
            vueJsx({
                transformOn: true,
                mergeProps: true,
            }),
            // 拆包大小
            chunkSplitPlugin({
                strategy: 'default',
                customSplitting: {
                    'vue-vendor': ['vue', 'vue-router'],
                    elementplus: ['element-plus'],
                    composables: [/src\/composables/],
                    utils: [/src\/utils/],
                },
            }),
            // 图片压缩
            // viteImagemin({
            //     gifsicle: {
            //         optimizationLevel: 7,
            //         interlaced: false,
            //     },
            //     optipng: {
            //         optimizationLevel: 7,
            //     },
            //     mozjpeg: {
            //         quality: 20,
            //     },
            //     pngquant: {
            //         quality: [0.8, 0.9],
            //         speed: 4,
            //     },
            //     svgo: {
            //         plugins: [
            //             {
            //                 name: 'removeViewBox',
            //             },
            //             {
            //                 name: 'removeEmptyAttrs',
            //                 active: false,
            //             },
            //         ],
            //     },
            // }),
            // 去除console.log
            removeConsole(),
            // 打包进度条
            progress(),
            // 引用svg图标
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg/')],
                // 指定symbolId格式
                symbolId: '[name]',
                customDomId: '__svg__icons__dom__',
            }),
            UnoCSS(),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    // additionalData: '@import "./src/styles/variables";', // 全局css
                    additionalData: [
                        `@use "@/styles/element/index.scss" as *;`,
                        // `@import "@/styles/variables.scss";`,
                    ],
                    javascriptEnabled: true,
                },
            },
        },
        // 构建选项
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: 'js/[name]-[hash].js',
                    chunkFileNames: 'js/[name]-[hash].js',
                    // 将图片资源与其他资源拆开放到相应的文件内，是用函数的方式
                    assetFileNames(chunkInfo) {
                        // if (chunkInfo.name) {
                        //     // name 文件名 , ext 文件后缀名
                        //     const [name, ext] = path
                        //         .basename(chunkInfo.name)
                        //         .split('.');
                        //     return `assets/${
                        //         pictureSuffix.test(ext.toLowerCase())
                        //             ? 'images'
                        //             : ext
                        //     }/${name.toLowerCase()}-[hash].${ext}`;
                        // }
                        if (chunkInfo.name) {
                            const [name, ext] = path
                                .basename(chunkInfo.name)
                                .split('.');
                            return `assets/${name.toLocaleLowerCase()}-[hash].${ext}`;
                        }
                        return '';
                    },
                },
            },
        },
        // 配置开发环境
        server: {
            port: 3032, //启动端口
            hmr: {
                host: '127.0.0.1',
                port: 3030,
            },
            open: true,
            // 设置http 代理
            // proxy: {
            //   '/api': {
            //     target: 'your https address',
            //     changeOrigin: true,
            //     rewrite: (path: string) => path.replace(/^\/api/, '')
            //   }
            // }
        },
    };
});
