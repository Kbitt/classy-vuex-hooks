import { Store } from 'vuex'
import { state, createStore, mutation, getset } from 'classy-vuex'
import { action, model } from '../src'

export interface SubState {
    count: number
}

export class SubModule implements SubState {
    @state
    count = 0

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
    @state
    value = ''

    @getset()
    on1 = true

    @mutation
    setValue(value: string) {
        this.value = value
    }

    @getset()
    astr = 'astr'

    @getset()
    wasCalled = false

    @model('fooAction')
    filter = ''

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
