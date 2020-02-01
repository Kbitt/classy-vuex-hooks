import {
    action,
    state,
    model,
    getset,
    createStore,
    mutation,
} from 'classy-vuex'
import { Store } from 'vuex'

export interface StateTestState {
    n: string
    i: number
    j: number
}

export class StateTestModule implements StateTestState {
    @state
    n = 'n'
    @getset()
    i = 0
    @model('foo')
    j = 0

    @mutation
    SET_N(n: string) {
        this.n = n
    }

    @action()
    async foo() {
        this.SET_N('foo called')
    }
}

export const getStateTestStore = (): Store<StateTestState> =>
    createStore(StateTestModule)
