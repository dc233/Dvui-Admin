/** http请求头的content-type类型 */
export enum EnumContentType {
    json = 'application/json',
    formUrlencoded = 'application/x-www-form-urlencoded',
    formData = 'multipart/form-data',
}

/** 数据类型 */
export enum EnumDataType {
    number = '[object Number]',
    string = '[object String]',
    boolean = '[object Boolean]',
    null = '[object Null]',
    undefined = '[object Undefined]',
    object = '[object Object]',
    array = '[object Array]',
    date = '[object Date]',
    regexp = '[object RegExp]',
    set = '[object Set]',
    map = '[object Map]',
    file = '[object File]',
}

/** 布局组件的名称 */
export enum EnumLayoutComponentName {
    layout = 'Layout',
    iframe = 'IFramet',
    notfound = 'notFound',
}

/** 过渡动画类型 */
export enum EnumThemeAnimateMode {
    'zoom-fade' = '渐变',
    'zoom-out' = '闪现',
    'fade-slide' = '滑动',
    'fade' = '消退',
    'fade-bottom' = '底部消退',
    'fade-scale' = '缩放消退',
}
/** 缓存的key */
export enum EnumStorageKey {
    /** 用户token */
    'token' = '__TOKEN__',
    /** 用户信息 */
    'user-info' = '__USER_INFO__',
    /** 系统主题颜色 */
    'theme-color' = '__THEMECOLOR__',
    /** 系统布局  */
    'theme-layout' = '__THEMELAYOUT__',
    /* 标签页持久化 */
    'tabs-keepalive' = '__TABSKEEPALIVE__',
    /* 页面切换动画 */
    'page-animate' = '__PAGEANIMATE__',
    /* 动画类型 */
    'animate-type' = '__ANIMATETYPE__',
    /* 系统主题 */
    'theme' = '__THEME__',
}
