<template>
    <div>
        <input type="text" id="input1" v-model="model" />
        <input id="input2" type="text" v-model="astr" />
    </div>
</template>
<script lang="ts">
import { Foo } from './modules.store'
import { createComponent, computed } from '@vue/composition-api'
import { useModule } from '../src/hook'
export default createComponent({
    setup: () => {
        const m = useModule(Foo)
        return {
            model: computed<string>({
                get: () => m.value.value,
                set: value => m.value.setValue(value),
            }),
            astr: computed<string>({
                get: () => m.value.astr,
                set: value => (m.value.astr = value),
            }),
        }
    },
})
</script>
