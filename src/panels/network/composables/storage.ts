import { Storage } from "@plasmohq/storage"
import { useStorageAsync, StorageLikeAsync, MaybeRefOrGetter } from '@vueuse/core'

class AsyncStorage implements StorageLikeAsync {
  storage: Storage
  constructor() {
    this.storage = new Storage({ area: 'local'})
  }
  async getItem(key: string) {
    const v = await this.storage.get(key)
    console.log('getItem', v)
    return v
  }
  setItem(key: string, value: string) {
    console.log('setItem', key, value)
    return this.storage.set(key, value)
  }
  removeItem(key: string) {
    console.log('removeItem', key)
    return this.storage.remove(key)
  }
}

const asyncStorage = new AsyncStorage()

export function useAsyncStorage<T>(key: string, initialValue: MaybeRefOrGetter<T>) {
  // return useStorageAsync<T>(key, initialValue, asyncStorage, { mergeDefaults: true })
  return useStorageAsync<T>(key, initialValue, localStorage, { mergeDefaults: true })
}
