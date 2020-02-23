import { getLocalVue, wait } from '../_init'
import { Store } from 'vuex'
import { createStore, state } from 'classy-vuex'
import DynamicModule from './FactoryModule.vue'
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

    const checkUses = (namespace: string) => {
        const state = store.state[namespace]
        const symbol = Object.getOwnPropertySymbols(state).find(s =>
            s.toString().includes('USES')
        )
        return state[symbol!] as number
    }

    it('test it', async () => {
        const wrapped = mount(DynamicModule, { localVue, store })
        const nsInput = wrapped.find('#namespace')

        const getMessage = (namespace: string) =>
            (wrapped.find(`#${namespace}_message`).element as HTMLInputElement)
                .value
        expect(store.state.dyn0.message).toBe('init')
        expect(getMessage('dyn0')).toBe('init')
        expect(checkUses('dyn0')).toBe(1)

        nsInput.setValue('dyn1')
        nsInput.trigger('input')
        await localVue.nextTick()

        expect(store.state.dyn1.message).toBe('init')
        expect(store.state.dyn0).toBe(undefined)
    })

    it('test it w/ delay', async () => {
        const wrapped = mount(DynamicModule, {
            localVue,
            store,
            propsData: {
                delay: 1000,
            },
        })
        const nsInput = wrapped.find('#namespace')

        const getMessage = (namespace: string) =>
            (wrapped.find(`#${namespace}_message`).element as HTMLInputElement)
                .value
        expect(store.state.dyn0.message).toBe('init')
        expect(getMessage('dyn0')).toBe('init')
        expect(checkUses('dyn0')).toBe(1)

        nsInput.setValue('dyn1')
        nsInput.trigger('input')
        await localVue.nextTick()

        expect(store.state.dyn1.message).toBe('init')
        expect(checkUses('dyn1')).toBe(1)
        expect(!!store.state.dyn0).toBe(true)
        await wait(2100)
        expect(store.state.dyn0).toBe(undefined)
    })
})
