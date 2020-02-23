<template>
    <div>
        <input :id="namespace + '_message'" :value="message" />
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    computed,
    ref,
    onBeforeMount,
    onUnmounted,
} from '@vue/composition-api'
import { useMappedModule } from '../../src'
import { FactoryModule } from './factory.store'
export default defineComponent({
    props: {
        namespace: {
            type: String,
            required: true,
        },
        delay: Number,
    },
    setup: props => {
        const namespace = computed(() => props.namespace)
        const mapped = useMappedModule(FactoryModule, namespace, {
            factory: () => new FactoryModule(),
            dispose: {
                delay: props.delay,
            },
        })
        return {
            ...mapped,
        }
    },
})
</script>
