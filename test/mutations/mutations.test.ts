import { VueConstructor } from 'vue/types/umd'
import { getLocalVue } from '../_init'
import { Store } from 'vuex'
import { ModuleTestState, MutationTestModule } from './mutations.store'
import { createStore } from '../../src'
import { shallowMount } from '@vue/test-utils'
import MutationModule from './MutationModule.vue'

describe('useMutations', () => {
    let localVue: VueConstructor<Vue>
    let store: Store<ModuleTestState>
    const mount = () => shallowMount(MutationModule, { localVue, store })
    let wrapper: ReturnType<typeof mount>
    beforeEach(() => {
        localVue = getLocalVue()
        store = createStore(MutationTestModule)
        wrapper = mount()
    })

    it('using useMutations', async () => {
        const foo = wrapper.find('#foo')
        const fooEl = foo.element as HTMLInputElement
        const bar = wrapper.find('#bar')
        const barEl = bar.element as HTMLInputElement

        expect(fooEl.value).toBe('')
        expect(barEl.value).toBe('0')

        const FOO_VAL = 'FOOOOOEXXXYYY'
        const BAR_VAL = 732472347

        fooEl.value = FOO_VAL
        foo.trigger('input')
        await localVue.nextTick()
        expect(store.state.foo).toBe(FOO_VAL)

        barEl.value = BAR_VAL + ''
        bar.trigger('input')
        await localVue.nextTick()
        expect(store.state.bar).toBe(BAR_VAL)
    })

    it('check getset/model mutations', async () => {
        const foo = wrapper.find('#fb')
        const fooEl = foo.element as HTMLInputElement
        const bar = wrapper.find('#foob')
        const barEl = bar.element as HTMLInputElement

        expect(fooEl.value).toBe('123')
        expect(barEl.value).toBe('1')

        const FOO_VAL = 'FOOOOOEXXXYYY'
        const BAR_VAL = 732472347

        fooEl.value = FOO_VAL
        foo.trigger('input')
        await localVue.nextTick()
        expect(store.state.fb).toBe(FOO_VAL)

        barEl.value = BAR_VAL + ''
        bar.trigger('input')
        await localVue.nextTick()
        expect(store.state.foob).toBe(BAR_VAL)
    })
})
