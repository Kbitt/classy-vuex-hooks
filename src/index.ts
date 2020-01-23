import { PluginObject } from 'vue'
import { StoreHook, setStoreHook } from './store'
import { Store, StoreOptions } from 'vuex'
import ClassyVuex from 'classy-vuex'
export * from 'classy-vuex'
export * from './hook'

export interface ClassyVuexHooksPluginOptions {
    storeHook: StoreHook
    Store: { new (options: StoreOptions<any>): Store<any> }
}

const ClassyVuexHooks: PluginObject<ClassyVuexHooksPluginOptions> = {
    install: (Vue, options) => {
        if (!options || !options.Store || !options.storeHook) {
            throw new Error(
                'You must provide Store and storeHook to classy-vuex-plugin options'
            )
        }
        Vue.use(ClassyVuex, { Store: options.Store })
        setStoreHook(options.storeHook)
    },
}

export default ClassyVuexHooks
