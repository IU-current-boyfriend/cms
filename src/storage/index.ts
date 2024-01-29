// 本地化缓存还没有完全写完：获取和设置的时候，我们想要的是能够对不同的本地缓存库进行
// 指定化的获取和设置。比如：对loginStore的id属性单独进行获取和设置，对mainStore的project进行
// 单独获取和设置。

// 枚举
enum ECacheType {
  SessionCache,
  LocalCache
}

// Cache的接口
interface ICache {
  setItem: (key: string, value: any) => void;
  // getItem: (key: string) => any;
  clearItem: (key: string) => void;
  clear: () => void;
}

class Cache implements ICache {
  // storage缓存的类型是Storage
  private storage: Storage;
  constructor(private cacheType: ECacheType) {
    this.storage =
      cacheType === ECacheType.SessionCache ? sessionStorage : localStorage;
  }
  // 设置缓存
  public setItem(key: string, value: any): void {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  // 获取缓存
  public getItem(cacheName: string, key: string): any {
    const isLocalCache = this.storage.getItem(cacheName);
    if (isLocalCache) {
      const localCacheParse = JSON.parse(isLocalCache);
      const isKey = Object.keys(localCacheParse).includes(key);
      if (isKey) return localCacheParse[key];
    }
  }

  // 清除某项缓存
  public clearItem(key: string): void {
    this.storage.removeItem(key);
  }

  // 清除所有缓存
  public clear(): void {
    this.storage.clear();
  }
}

const sessionCache = new Cache(ECacheType.SessionCache);
const localCache = new Cache(ECacheType.LocalCache);

export { sessionCache, localCache };
