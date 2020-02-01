import { VueConstructor } from 'vue/types/umd'
import { getLocalVue } from '../_init'
import { getStateTestStore, StateTestModule } from './state.store'
import StateModule from './StateModule.vue'
import { shallowMount } from '@vue/test-utils'
import { getModule } from '../../src'

describe('useState', () => {
    let localVue: VueConstructor<Vue>
    let store: ReturnType<typeof getStateTestStore>
    beforeEach(() => {
        localVue = getLocalVue()
        store = getStateTestStore()
    })

    it('test result length', () => {
        const wrapper = shallowMount(StateModule, { localVue, store })
        const inputWrapper = wrapper.find('#length')
        expect((inputWrapper.element as HTMLInputElement).value).toBe('3')
    })

    it('test values', () => {
        const wrapper = shallowMount(StateModule, { localVue, store })
        const values = [
            ['#n', 'n'],
            ['#i', '0'],
            ['#j', '0'],
        ]
        values.forEach(([id, value]) => {
            const inputWrapper = wrapper.find(id)
            expect((inputWrapper.element as HTMLInputElement).value).toBe(value)
        })
    })

    it('test mutated values', async () => {
        const wrapper = shallowMount(StateModule, { localVue, store })
        const N_VAL = 'EXY'
        store.commit('SET_N', N_VAL)
        const I_VAL = 123
        store.commit('SET_I', I_VAL)
        const J_VAL = 789
        store.commit('SET_J', J_VAL)
        const values = [
            ['#n', N_VAL],
            ['#i', '' + I_VAL],
            ['#j', '' + J_VAL],
        ]
        await localVue.nextTick()
        values.forEach(([id, value]) => {
            const inputWrapper = wrapper.find(id)
            expect((inputWrapper.element as HTMLInputElement).value).toBe(value)
        })
    })

    it('test using model', async () => {
        const m = getModule(StateTestModule)
        m.j = 123

        const wrapper = shallowMount(StateModule, { localVue, store })
        const values = [
            ['#n', 'foo called'],
            ['#j', '' + 123],
        ]
        values.forEach(([id, value]) => {
            const inputWrapper = wrapper.find(id)
            expect((inputWrapper.element as HTMLInputElement).value).toBe(value)
        })
    })
})
