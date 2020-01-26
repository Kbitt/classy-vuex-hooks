import { Store } from 'vuex'
import { state, createStore, mutation, getset } from 'classy-vuex'
import { action, model } from '../src'

export interface SubState {
    count: number
}

export class SubModule implements SubState {
    @state(0)
    count!: number

    @mutation
    inc() {
        this.count++
    }
}

export interface FooState {
    value: string
    astr: string
    filter: string
    wasCalled: boolean
    on1: boolean
}

export class Foo implements FooState {
    @state('')
    value!: string

    @getset(true)
    on1!: boolean

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

    modules = {
        sub1: new SubModule(),
        sub2: new SubModule(),
    }
}

export const getStore = (): Store<FooState> => createStore(Foo)
