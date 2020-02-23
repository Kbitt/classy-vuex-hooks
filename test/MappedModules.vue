<template>
    <div>
        <input
            id="input1"
            type="text"
            :value="value"
            @input="e => setValue(e.target.value)"
        />
        <input id="input2" type="text" v-model="astr" />
        <input id="input3" type="text" v-model="filter" />
        <input
            id="ns_toggle"
            type="checkbox"
            checked
            :value="on1"
            @input="e => (on1 = e.target.checked)"
        />
        <input id="count" :value="count" type="number" />
        <input id="virtual" v-model="virt" type="text" />
        <button id="inc" @click="inc">inc</button>
    </div>
</template>
<script lang="ts">
import { Foo, SubModule } from './modules.store'
import { defineComponent, computed, Ref } from '@vue/composition-api'
import { useMappedModule } from '../src/hook'
export default defineComponent({
    setup: () => {
        const m = useMappedModule(Foo)
        const ns = computed(() => {
            const ns = (m.on1 as Ref<boolean>).value ? 'sub1' : 'sub2'
            return ns
        })
        const sub = useMappedModule(SubModule, ns)
        return {
            ...m,
            ...sub,
        }
    },
})
</script>
