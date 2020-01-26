/// <reference types="./shims-vue" />
import Vuex from 'vuex'
import ClassyVuexHooks from '../src'
import CompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(CompositionApi)

localVue.use(ClassyVuexHooks)

export { localVue }
