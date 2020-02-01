<template>
    <div>
        <input id="length" :value="length" />
        <input id="n" :value="n" />
        <input id="i" :value="i" />
        <input id="j" :value="j" />
    </div>
</template>
<script lang="ts">
import { createComponent, computed, Ref } from '@vue/composition-api'
import { useState } from '../../src'
import { StateTestModule, StateTestState } from './state.store'
export default createComponent({
    setup: () => {
        const states = useState<StateTestModule, StateTestState>(
            StateTestModule
        )
        return {
            ...states,
            length: Object.keys(states).length,
        }
    },
})
</script>
