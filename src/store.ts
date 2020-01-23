import { Ref, computed } from '@vue/composition-api'

export type StoreHook = () => import('vuex').Store<any>

let storeHook: StoreHook | null = null
export const setStoreHook = (hook: StoreHook) => (storeHook = hook)
export const useStore: () => import('vuex').Store<any> = () => {
    if (!storeHook) {
        throw new Error(
            'You must call Vue.use(VuexClassHook) and provide a hook for the vuex store'
        )
    }
    return storeHook()
}
