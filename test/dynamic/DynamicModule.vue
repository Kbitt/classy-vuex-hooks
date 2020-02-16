<template>
    <div>
        <input id="namespace" v-model="namespace" />
        <dynamic-submodule :namespace="namespace" :key="namespace" />
    </div>
</template>
<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api'
import DynamicSubmodule from './DynamicSubmodule.vue'
export default createComponent({
    components: {
        DynamicSubmodule,
    },
    setup: () => {
        const namespace = ref('dyn0')
        return {
            namespace,
        }
    },
})
</script>
