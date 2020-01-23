/// <reference types="./shims-vue" />
import Vuex, { Store } from 'vuex'
import ClassyVuexHooks from '../src'
import CompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(CompositionApi)

let _store: Store<any>
const storeHook = () => _store

localVue.use(ClassyVuexHooks, { Store, storeHook })

const setStore = (store: Store<any>) => {
    _store = store
}

export { localVue, setStore }
