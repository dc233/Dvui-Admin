export function isExternal(path: string) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

export * from './service';
// export * from './request';
export * from './common';
// export * from './router';
export * from './storage';
export * from './auth';
