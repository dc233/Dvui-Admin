/** 通用类型 */
declare namespace Common {
    /**
     * 策略模式
     * [状态, 为true时执行的回调函数]
     */
    type StrategyAction = [boolean, () => void];

    // 定义一个string作为key的类型
    type stringKey = Record<string, any>;
}

/**
 * 文件类型
 */

declare namespace File {
    type ImageMimeType =
        | 'image/apng'
        | 'image/bmp'
        | 'image/gif'
        | 'image/jpeg'
        | 'image/pjpeg'
        | 'image/png'
        | 'image/svg+xml'
        | 'image/tiff'
        | 'image/webp'
        | 'image/x-icon';
    type ExcelMimeType =
        | '.csv'
        | 'application/vnd.ms-excel'
        | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
}
