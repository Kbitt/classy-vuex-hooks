import { localVue } from './_init'
import { Store } from 'vuex'
import { shallowMount } from '@vue/test-utils'
import Modules from './Modules.vue'
import MappedModules from './MappedModules.vue'
import { FooState, getStore } from './modules.store'

const INPUT = 'input'
const INPUT1_ID = '#input1'
const INPUT2_ID = '#input2'
const INPUT3_ID = '#input3'

describe('test module hooks', () => {
    let store: Store<FooState>
    beforeEach(() => {
        store = getStore()
    })
    it('test mutation', () => {
        const wrapper = shallowMount(Modules, { localVue })
        const input = wrapper.find(INPUT1_ID)
        const el = input.element as HTMLInputElement
        el.value = INPUT
        input.trigger(INPUT)
        expect(store.state.value).toBe(INPUT)
    })

    it('test getset', () => {
        const wrapper = shallowMount(Modules, { localVue })
        const input = wrapper.find(INPUT2_ID)
        const el = input.element as HTMLInputElement
        el.value = INPUT
        input.trigger(INPUT)
        expect(store.state.astr).toBe(INPUT)
    })

    it('test mapped module', () => {
        const wrapper = shallowMount(MappedModules, { localVue })
        const input = wrapper.find(INPUT1_ID)
        const el = input.element as HTMLInputElement
        el.value = INPUT
        input.trigger(INPUT)
        expect(store.state.value).toBe(INPUT)
    })

    it('test getset w/ mapped module', () => {
        const wrapper = shallowMount(MappedModules, { localVue })
        const input = wrapper.find(INPUT2_ID)
        const el = input.element as HTMLInputElement
        el.value = INPUT
        input.trigger(INPUT)
        expect(store.state.astr).toBe(INPUT)
    })

    it('test model w/ mapped module', () => {
        const wrapper = shallowMount(MappedModules, { localVue })
        const input = wrapper.find(INPUT3_ID)
        const el = input.element as HTMLInputElement
        el.value = INPUT
        input.trigger(INPUT)
        expect(store.state.filter).toBe(INPUT)
        expect(store.state.wasCalled).toBe(true)
    })
})
