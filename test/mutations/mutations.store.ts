import { state, mutation, getset, model, action } from '../../src'

export interface ModuleTestMutations {
    setFoo(value: string): void
    setBar(value: number): void
    setFoob(value: number): void
    setFubar(value: string): void
}

export interface ModuleTestState {
    foo: string
    bar: number
    foob: number
    fb: string
}

export class MutationTestModule
    implements ModuleTestMutations, ModuleTestState {
    @state
    foo = ''

    @mutation
    setFoo(value: string) {
        this.foo = value
    }

    @state
    bar = 0
    @mutation
    setBar(value: number) {
        this.bar = value
    }

    @getset('setFoob')
    foob = 1

    setFoob!: (value: number) => void

    @model('fooAction', 'setFubar')
    fb = '123'

    setFubar!: (value: string) => void

    @action()
    async fooAction() {}
}
