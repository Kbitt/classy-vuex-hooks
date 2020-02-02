import { state, getter, getset } from '../../src'

export interface GetterTestGetters {
    foo: number
    bar(): number
}

export interface GetterTestState {
    value: number
}

export class GetterTestModule implements GetterTestState, GetterTestGetters {
    @getset()
    value = 10

    @getter
    get foo() {
        return this.value * 2
    }

    @getter
    bar() {
        return Math.pow(this.value, 2)
    }
}
