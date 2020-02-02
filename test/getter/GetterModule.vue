<template>
    <div>
        <input id="foo" :value="foo" />
        <input id="bar" :value="bar" />
    </div>
</template>
<script lang="ts">
import { GetterTestModule, GetterTestGetters } from './getters.store'
import { createComponent } from '@vue/composition-api'
import { useGetters } from '../../src'
export default createComponent({
    setup: () => {
        const getters = useGetters<GetterTestGetters>(GetterTestModule)

        return { ...getters }
    },
})
</script>
