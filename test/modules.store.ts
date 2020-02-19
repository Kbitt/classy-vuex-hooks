import { Store } from 'vuex'
import {
    state,
    createStore,
    mutation,
    getset,
    virtual,
    getter,
} from 'classy-vuex'
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

    @getter
    get next() {
        return this.count + 1
    }

    @getter
    get isOdd() {
        return (n: number) => n % 2 !== 0
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
    @virtual('value', 'setValue')
    virt!: string
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
