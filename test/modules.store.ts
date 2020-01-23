import { Store } from 'vuex'
import { state, createStore, mutation, getset } from 'classy-vuex'

export interface FooState {
    value: string
    astr: string
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
}

export const getStore = (): Store<FooState> => createStore(Foo)
