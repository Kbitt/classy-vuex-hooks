<template>
    <div>
        <input id="foo" :value="foo" />
        <input id="bar" :value="bar" />
    </div>
</template>
<script lang="ts">
import { GetterTestModule, GetterTestGetters } from './getters.store'
import { defineComponent } from '@vue/composition-api'
import { useGetters } from '../../src'
export default defineComponent({
    setup: () => {
        const getters = useGetters<GetterTestGetters>(GetterTestModule)

        return { ...getters }
    },
})
</script>
