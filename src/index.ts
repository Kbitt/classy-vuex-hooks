import { PluginObject } from 'vue'
import ClassyVuex from 'classy-vuex'
export * from 'classy-vuex'
export * from './hook'

const ClassyVuexHooks: PluginObject<never> = {
    install: Vue => {
        Vue.use(ClassyVuex)
    },
}

export default ClassyVuexHooks
