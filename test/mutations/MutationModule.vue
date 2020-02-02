<template>
    <div>
        <input
            id="foo"
            :value="foo"
            @input="e => setFoo(e && e.target ? e.target.value : e)"
        />
        <input
            id="bar"
            type="number"
            :value="bar"
            @input="e => setBar(parseInt(e.target ? e.target.value : e))"
        />
        <input
            id="foob"
            type="number"
            :value="foob"
            @input="e => setFoob(parseInt(e && e.target ? e.target.value : e))"
        />

        <input
            id="fb"
            :value="fb"
            @input="e => setFubar(e && e.target ? e.target.value : e)"
        />
    </div>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
import {
    ModuleTestMutations,
    MutationTestModule,
    ModuleTestState,
} from './mutations.store'
import { useMutations, useState } from '../../src'
export default createComponent({
    setup: () => {
        const mutations = useMutations<ModuleTestMutations>(MutationTestModule)
        const states = useState<ModuleTestState>(MutationTestModule)
        return {
            ...mutations,
            ...states,
        }
    },
})
</script>
