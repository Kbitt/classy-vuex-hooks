<template>
    <div>
        <input id="namespace" v-model="namespace" />
        <factory-submodule
            :namespace="namespace"
            :key="namespace"
            :delay="delay"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import FactorySubmodule from './FactorySubmodule.vue'
export default defineComponent({
    components: {
        FactorySubmodule,
    },
    props: {
        delay: {
            type: Number,
            default: 0,
        },
    },
    setup: () => {
        const namespace = ref('dyn0')
        return {
            namespace,
        }
    },
})
</script>
