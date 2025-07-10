class Cache {
    constructor(isLocal = true) {
        this.storage = isLocal ? localStorage : sessionStorage
    }
    setCache(key, value) {
        if (!value) {
            throw new Error("value error: value必须传值")
        }
        this.storage.setItem(key, JSON.stringify(value))
    }
    getCache(key) {
        const result = this.storage.getItem(key)
        if (result) {
            return JSON.parse(result)
        }
    }
    removeCache(key) {
        this.storage.removeItem(key)
    }
    clearCache() {
        this.storage.clear()
    }
}
export const localCache = new Cache()
export const sessionCache = new Cache(false)
