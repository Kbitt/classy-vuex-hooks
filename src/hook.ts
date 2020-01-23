import {
    getModuleAs,
    getStates,
    getGetterKeys,
    getActions,
    getMutations,
    getGetSets,
} from 'classy-vuex'
import { Ref, computed, ref } from '@vue/composition-api'
import { useStore } from './store'

const normalizeNamespace = (
    namespaceRef: string | Ref<string | undefined> | undefined = ref(undefined)
) => (typeof namespaceRef === 'string' ? namespaceRef : namespaceRef.value)

export const useModule = <T>(
    ctor: { new (...args: any[]): T },
    namespaceRef: string | Ref<string | undefined> | undefined = ref(undefined)
): Ref<T> => {
    return computed(() => {
        const namespace = normalizeNamespace(namespaceRef)
        const store = useStore()
        return getModuleAs(ctor, store, namespace)
    })
}

export const useMappedModule = <T extends Record<string, any>>(
    ctor: { new (...args: any[]): T },
    namespaceRef: string | Ref<string | undefined> | undefined = ref(undefined)
): Record<keyof T, Function | Ref<any>> => {
    const result: Record<string, Function | Ref<any>> = {}

    const refKeys = [getStates, getGetterKeys]
        .map(fn => [...fn(ctor.prototype)])
        .reduce((a, b) => [...a, ...b])

    const cm = () => useModule(ctor, namespaceRef).value as T

    refKeys.forEach(
        key =>
            (result[key] = computed(() => {
                const fn = cm()[key as keyof T]
                return typeof fn === 'function' ? fn() : fn
            }))
    )

    getGetSets(ctor.prototype).forEach(
        gs =>
            (result[gs.key] = computed({
                get: () => cm()[gs.key as keyof T],
                set: value => (cm()[gs.key as keyof T] = value),
            }))
    )

    const fnKeys = [getActions, getMutations]
        .map(fn => [...fn(ctor.prototype)])
        .reduce((a, b) => [...a, ...b])

    fnKeys.forEach(
        key => (result[key] = (...args: any[]) => cm()[key as keyof T](...args))
    )

    return result as Record<keyof T, Ref<any> | Function>
}
