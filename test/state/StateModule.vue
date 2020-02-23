<template>
    <div>
        <input id="length" :value="length" />
        <input id="n" :value="n" />
        <input id="i" :value="i" />
        <input id="j" :value="j" />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, Ref } from '@vue/composition-api'
import { useState } from '../../src'
import { StateTestModule, StateTestState } from './state.store'
export default defineComponent({
    setup: () => {
        const states = useState<StateTestState>(StateTestModule)
        return {
            ...states,
            length: Object.keys(states).length,
        }
    },
})
</script>
