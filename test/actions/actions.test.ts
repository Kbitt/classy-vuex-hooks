import { getLocalVue } from '../_init'
import {
    ActionTestActions,
    ActionTestState,
    ActionTestModule,
} from './actions.store'
import ActionModule from './ActionModule.vue'
import { Store } from 'vuex'
import { createStore } from '../../src'
import { shallowMount } from '@vue/test-utils'

describe('useActions', () => {
    let store: Store<ActionTestState>
    let localVue: ReturnType<typeof getLocalVue>
    const mount = () => shallowMount(ActionModule, { store, localVue })
    let wrapped: ReturnType<typeof mount>
    beforeEach(() => {
        localVue = getLocalVue()
        store = createStore(ActionTestModule)
        wrapped = mount()
    })

    it('works', async () => {
        wrapped.find('#btn').trigger('click')
        await localVue.nextTick()
        expect(store.state.value).toBe('foo called')
    })
})
