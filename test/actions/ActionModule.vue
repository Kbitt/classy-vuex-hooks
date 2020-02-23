<template>
    <div>
        <button type="button" id="btn" @click="foo"></button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {
    ActionTestActions,
    ActionTestState,
    ActionTestModule,
} from './actions.store'
import { useActions } from '../../src'
export default defineComponent({
    setup: () => {
        const actions = useActions<ActionTestActions>(ActionTestModule)
        return {
            ...actions,
        }
    },
})
</script>
