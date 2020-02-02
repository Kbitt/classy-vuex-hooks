import { getset, action } from '../../src'

export interface ActionTestState {
    value: string
}

export interface ActionTestActions {
    foo(): Promise<any>
}

export class ActionTestModule implements ActionTestState, ActionTestActions {
    @getset()
    value = 'init'

    @action()
    async foo() {
        this.value = 'foo called'
    }
}
