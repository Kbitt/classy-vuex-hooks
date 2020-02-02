import {
    getModule,
    getStates,
    getGetterKeys,
    getMutations,
    getActionKeys,
    getGetSetKeys,
    getModelKeys,
    getGetSets,
    getModels,
} from 'classy-vuex'
import { Ref, computed, ref } from '@vue/composition-api'

const normalizeNamespace = (
    namespaceRef: string | Ref<string | undefined> | undefined = ref(undefined)
) => (typeof namespaceRef === 'string' ? namespaceRef : namespaceRef.value)

/** Hook to access the given module. If a namespace ref is supplied, the module will reactively change namespaces when the ref updates */
export const useModule = <T>(
    ctor: { new (...args: any[]): T },
    namespaceRef?: string | Ref<string | undefined>
): Ref<T> =>
    computed(() => {
        const namespace = normalizeNamespace(namespaceRef)
        return getModule(ctor, namespace)
    })

const getGetKeys = (target: any) =>
    getStates(target).concat(getGetterKeys(target))

const getPropKeys = (target: any) =>
    getGetSetKeys(target).concat(getModelKeys(target))

const getAllStateKeys = (target: any) =>
    getStates(target)
        .concat(getGetSetKeys(target))
        .concat(getModelKeys(target))

const getAllMutationKeys = (target: any) =>
    getMutations(target)
        .concat(getGetSets(target).map(gs => gs.mutationName))
        .concat(getModels(target).map(m => m.mutationName))

const getFuncKeys = (target: any) =>
    getActionKeys(target).concat(getMutations(target))

/** Create a map of refs from the given module. If a namespace ref is supplied, the namespace will reactively change when the ref updates  */
export const useMappedModule = <T extends Record<string, any>>(
    ctor: { new (...args: any[]): T },
    namespaceRef?: string | Ref<string | undefined>
): Record<keyof T, Function | Ref<any>> => {
    const result: Record<string, Function | Ref<any>> = {}

    const cm = () => useModule(ctor, namespaceRef).value as T

    getGetKeys(ctor.prototype).forEach(
        key =>
            (result[key] = computed(() => {
                const fn = cm()[key as keyof T]
                return typeof fn === 'function' ? fn() : fn
            }))
    )

    getPropKeys(ctor.prototype).forEach(
        key =>
            (result[key] = computed({
                get: () => cm()[key as keyof T],
                set: value => (cm()[key as keyof T] = value),
            }))
    )

    getFuncKeys(ctor.prototype).forEach(
        key => (result[key] = (...args: any[]) => cm()[key as keyof T](...args))
    )

    return result as Record<keyof T, Ref<any> | Function>
}

export type StateRefDictionary<T> = {
    [P in keyof T]: Ref<T[P]>
}

export const useState = <TState extends Record<string, any> = any>(
    ctor: { new (...args: any[]): any },
    namespaceRef?: string | Ref<string | undefined>
): StateRefDictionary<TState> => {
    const result = {} as Record<string, any>
    const modRef = useModule(ctor, namespaceRef) as Ref<any>

    getAllStateKeys(ctor.prototype).forEach(
        key => (result[key] = computed<any>(() => modRef.value[key]))
    )

    return result as StateRefDictionary<TState>
}

export const useMutations = <TMutations extends {} = any>(
    ctor: { new (...args: any[]): {} },
    namespaceRef?: string | Ref<string | undefined>
): TMutations => {
    const result = {} as Record<string, Function>
    const mod = useModule(ctor, namespaceRef) as Ref<any>
    getAllMutationKeys(ctor.prototype).forEach(key => {
        result[key] = (...args: any) => mod.value[key](...args)
    })
    return result as TMutations
}
