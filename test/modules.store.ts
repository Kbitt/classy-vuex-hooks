import { Store } from 'vuex'
import { state, createStore, mutation, getset } from 'classy-vuex'
import { action, model } from '../src'

export interface FooState {
    value: string
    astr: string
    filter: string
    wasCalled: boolean
}

export class Foo implements FooState {
    @state('')
    value!: string

    @mutation
    setValue(value: string) {
        this.value = value
    }

    @getset('astr')
    astr!: string

    @getset(false)
    wasCalled!: boolean

    @model('', 'fooAction')
    filter!: string

    @action()
    fooAction() {
        this.wasCalled = true
        return Promise.resolve()
    }
}

export const getStore = (): Store<FooState> => createStore(Foo)
