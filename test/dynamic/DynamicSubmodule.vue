<template>
    <div>
        <input :id="namespace + '_message'" :value="message" />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import { useMappedModule } from '../../src'
import { DynamicModule } from './dynamic.store'
export default defineComponent({
    props: {
        namespace: {
            type: String,
            required: true,
        },
    },
    setup: props => {
        const namespace = computed(() => props.namespace)
        const mapped = useMappedModule(
            DynamicModule,
            namespace,
            () => new DynamicModule()
        )
        return {
            ...mapped,
        }
    },
})
</script>
