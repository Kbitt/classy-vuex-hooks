import { getLocalVue, wait } from '../_init'
import { Store } from 'vuex'
import { createStore, state } from 'classy-vuex'
import DynamicModule from './DynamicModule.vue'
import { mount } from '@vue/test-utils'

class Root {
    @state
    value = 0
}

describe("test dynamic registration w/ ref'd namesaces", () => {
    let store: Store<any>
    let localVue: ReturnType<typeof getLocalVue>
    beforeEach(() => {
        localVue = getLocalVue()
        store = createStore(new Root())
    })

    it('test it', async () => {
        const wrapped = mount(DynamicModule, { localVue, store })
        const nsInput = wrapped.find('#namespace')

        const getMessage = (namespace: string) =>
            (wrapped.find(`#${namespace}_message`).element as HTMLInputElement)
                .value
        expect(store.state.dyn0.message).toBe('init')
        expect(getMessage('dyn0')).toBe('init')

        nsInput.setValue('dyn1')
        nsInput.trigger('input')
        await localVue.nextTick()

        expect(store.state.dyn1.message).toBe('init')
    })
})
