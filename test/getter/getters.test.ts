import { getLocalVue } from '../_init'
import { Store } from 'vuex'
import { GetterTestState, GetterTestModule } from './getters.store'
import { createStore } from '../../src'
import GetterModule from './GetterModule.vue'
import { shallowMount } from '@vue/test-utils'

describe('useGetters', () => {
    let localVue: ReturnType<typeof getLocalVue>
    let store: Store<GetterTestState>
    const mount = () => shallowMount(GetterModule, { store, localVue })
    let wrapped: ReturnType<typeof mount>
    beforeEach(() => {
        localVue = getLocalVue()
        store = createStore(GetterTestModule)
        wrapped = mount()
    })

    it('test stuff works', () => {
        const foo = wrapped.find('#foo')
        const fooEl = foo.element as HTMLInputElement
        expect(fooEl.value).toBe('20')
        const bar = wrapped.find('#bar')
        const barEl = bar.element as HTMLInputElement
        expect(barEl.value).toBe('100')
    })

    it('test reactivity', async () => {
        store.commit('SET_VALUE', 20)
        expect(store.state.value).toBe(20)
        expect(store.getters['foo']).toBe(40)
        expect(store.getters['bar']).toBe(400)
        await localVue.nextTick()
        const foo = wrapped.find('#foo')
        const fooEl = foo.element as HTMLInputElement
        expect(fooEl.value).toBe('40')
        const bar = wrapped.find('#bar')
        const barEl = bar.element as HTMLInputElement
        expect(barEl.value).toBe('400')
    })
})
