import { getLocalVue } from './_init'
import { Store } from 'vuex'
import { shallowMount } from '@vue/test-utils'
import Modules from './Modules.vue'
import MappedModules from './MappedModules.vue'
import { FooState, getStore } from './modules.store'
import { VueConstructor } from 'vue/types/umd'

const INPUT = 'input'
const INPUT1_ID = '#input1'
const INPUT2_ID = '#input2'
const INPUT3_ID = '#input3'

describe('test module hooks', () => {
    let localVue: VueConstructor<Vue>
    let store: Store<FooState>
    beforeEach(() => {
        localVue = getLocalVue()
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

    it('test namespace toggling', async () => {
        const wrapper = shallowMount(MappedModules, { localVue })
        const input = wrapper.find('#ns_toggle')
        const count = wrapper.find('#count')
        const btn = wrapper.find('#inc')

        const switchNamespace = async () => {
            const ch = input.element as HTMLInputElement
            ch.checked = !ch.checked
            input.trigger('input')
            await localVue.nextTick()
        }

        const checkCount = (value: any) =>
            expect((count.element as HTMLInputElement).value).toBe('' + value)

        const inc = async () => {
            btn.trigger('click')
            await localVue.nextTick()
        }

        // check initial count
        checkCount(0)

        // increment count and check count
        await inc()
        checkCount(1)

        // switch namespace
        await switchNamespace()
        checkCount(0)

        // increment a couple times on the other namespace
        await inc()
        await inc()
        checkCount(2)

        await switchNamespace()
        checkCount(1)
        await inc()
        checkCount(2)
    })
})
