// 本地化缓存还没有完全写完：获取和设置的时候，我们想要的是能够对不同的本地缓存库进行
// 指定化的获取和设置。比如：对loginStore的id属性单独进行获取和设置，对mainStore的project进行
// 单独获取和设置。

// 枚举
enum ECacheType {
  SessionCache,
  LocalCache
}

class LocalCache {
  private storage: Storage;
  private STORAGE_KEY: string = "local_login_store";
  constructor(cacheType: ECacheType) {
    this.storage =
      cacheType === ECacheType.SessionCache ? sessionStorage : localStorage;
  }

  /**
   * local_login_store: {
   *    normal: 123,
   *    module_name: {
   *      id: 1,
   *      token: 234
   *    }
   * }
   *
   */

  public getItem(key: string, module_name?: string): any {
    const localStorageStore = this.getStorage();
    if (module_name) {
      // 传递模块名称的情况
      const module = localStorageStore[module_name];
      // 如果不存在该模块的话,直接返回undefined即可
      if (!module) return void 0;
      // 如果存在该模块的话，直接返回对象即可，注意此时module已经被反序列化了
      return module[key];
    } else {
      // 不存在模块的情况
      // 获取普通的值
      return localStorageStore[key];
    }
  }

  public setItem(key: string, value: any, module_name?: string) {
    if (module_name) {
      // 传递模块名称的情况
      let module = this.getItem(module_name);
      // 如果模块不存在话，初始化为空对象的形式
      if (!module) module = {};
      module[key] = value;
      this.setItem(module_name, module);
    } else {
      // 没有传递模块名称的情况
      // 因为有递归的情况，所以不能把这行代码提到最上面去
      const localStorageStore = this.getStorage();
      // 更新属性
      localStorageStore[key] = value;
      // 重新序列化存储
      this.storage.setItem(this.STORAGE_KEY, JSON.stringify(localStorageStore));
    }
  }

  public clear(key: string, module_name?: string) {
    const localStorageStore = this.getStorage();
    if (module_name) {
      // 传递模块名称的情况
      const module = this.getItem(module_name);
      // 如果module不存在的情况
      if (!module) return;
      // 如果module存在的情况
      delete module[module_name];
    } else {
      // 没有传递模块名称的情况
      // 删除属性
      delete localStorageStore[key];
    }
    // 删除后，重新序列化存储
    this.storage.setItem(this.STORAGE_KEY, JSON.stringify(localStorageStore));
  }

  private getStorage() {
    const localStorage = this.storage.getItem(this.STORAGE_KEY);
    // 如果不存在的话就直接返回空对象
    if (!localStorage) return {};
    // 如果存在的话就序列化直接返回
    return JSON.parse(localStorage);
  }
}

const sessionCache = new LocalCache(ECacheType.SessionCache);
const localCache = new LocalCache(ECacheType.LocalCache);

export { sessionCache, localCache };
