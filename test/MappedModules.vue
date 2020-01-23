<template>
    <div>
        <input
            id="input1"
            type="text"
            :value="value"
            @input="e => setValue(e.target.value)"
        />
        <input id="input2" type="text" v-model="astr" />
    </div>
</template>
<script lang="ts">
import { Foo } from './modules.store'
import { createComponent, computed } from '@vue/composition-api'
import { useMappedModule } from '../src/hook'
export default createComponent({
    setup: () => {
        const m = useMappedModule(Foo)
        return {
            ...m,
        }
    },
})
</script>
