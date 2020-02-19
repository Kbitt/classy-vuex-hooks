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
    getGetters,
    getVirtualKeys,
    isRegistered,
    registerModule,
    unregisterModule,
    mergeModule,
    getStore,
} from 'classy-vuex'

import {
    Ref,
    computed,
    ref,
    onBeforeMount,
    onUnmounted,
    onMounted,
} from '@vue/composition-api'

const normalizeNamespace = (
    namespaceRef: string | Ref<string | undefined> | undefined = ref(undefined)
) => (typeof namespaceRef === 'string' ? namespaceRef : namespaceRef.value)

export type ModuleFactoryDisposeOptions = {
    /** delay time to destroy in milliseconds (default: 10000) */
    delay?: number
}

export type ModuleFactoryOptions<T> = {
    factory: (namespace: string) => T
    dispose?: boolean | ModuleFactoryDisposeOptions
}

const USES = Symbol('USES')

type DynamicUseState = {
    [USES]: number
}

const INCREMENT = '__CVH_INCREMENT'
const DECREMENT = '__CVH_DECREMENT'

const DELAY_DEFAULT = 10000

const getDynamicUseModule = (): import('vuex').Module<
    DynamicUseState,
    any
> => ({
    state: () => ({
        [USES]: 0,
    }),
    mutations: {
        [INCREMENT]: state => state[USES]++,
        [DECREMENT]: state => state[USES]--,
    },
})

/** Hook to access the given module.
 * If a namespace ref is supplied, the module will reactively change namespaces when the ref updates
 * A factory function to create a module can be supplied to dynamically register the module if it is requested before it is registerd
 * */
export const useModule = <T>(
    ctor: { new (...args: any[]): T },
    namespaceRef?: string | Ref<string | undefined>,
    factory?: (namespace: string) => T
): Ref<T> =>
    computed(() => {
        const namespace = normalizeNamespace(namespaceRef)
        if (
            factory &&
            namespace &&
            namespaceRef !== undefined &&
            'value' in (namespaceRef as any) &&
            !isRegistered(namespace)
        ) {
            registerModule(namespace.split('/'), factory(namespace))
        }
        return getModule(ctor, namespace)
    })

const getGetKeys = (target: any) =>
    getStates(target).concat(getGetterKeys(target))

const getPropKeys = (target: any) =>
    getGetSetKeys(target)
        .concat(getModelKeys(target))
        .concat(getVirtualKeys(target))

const getAllStateKeys = (target: any) =>
    getStates(target)
        .concat(getGetSetKeys(target))
        .concat(getModelKeys(target))

const getAllMutationKeys = (target: any) =>
    getMutations(target)
        .concat(getGetSets(target).map(gs => gs.mutationName))
        .concat(getModels(target).map(m => m.mutationName))

const getAllActionKeys = (target: any) =>
    getActionKeys(target).concat(getModels(target).map(m => m.actionName))

const getFuncKeys = (target: any) =>
    getActionKeys(target).concat(getMutations(target))

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
    T
>() => T extends Y ? 1 : 2
    ? A
    : B

type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        never,
        P
    >
}[keyof T]

export type MappedModule<T> = {
    [P in keyof T]: T[P] extends Function
        ? T[P]
        : P extends ReadonlyKeys<T>
        ? Readonly<Ref<Readonly<T[P]>>>
        : Ref<T[P]>
}

/** Create a map of refs from the given module.
 * If a namespace ref is supplied, the namespace will reactively change when the ref updates.
 * If the modules targeted by a namespace ref are dynamic and created dynamically when a namespace prop/ref is updated,
 * Then it is very likely that the generated computed properties will attempt to access the namespace before the dynamic module can be registered.
 * To accomodate this, an optional factory function, which is passed the desired namespace, can be supplied and will be used to dynamically register the module
 * Before trying to access it
 * */
export const useMappedModule = <T extends Record<string, any>>(
    ctor: { new (...args: any[]): T },
    namespaceRef?: string | Ref<string | undefined>,
    factory?: (namespace: string) => T
): MappedModule<T> => {
    const result: Record<string, Function | Ref<any>> = {}

    const cm = () => useModule(ctor, namespaceRef, factory).value as T

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
                get: () => {
                    const result = cm()[key as keyof T]
                    return result
                },
                set: value => (cm()[key as keyof T] = value),
            }))
    )

    getFuncKeys(ctor.prototype).forEach(
        key => (result[key] = (...args: any[]) => cm()[key as keyof T](...args))
    )

    return result as MappedModule<T>
}

export type StateRefDictionary<T> = {
    [P in keyof T]: Ref<T[P]>
}

export type GetterRefDictionary<T> = {
    [P in keyof T]: T[P] extends (...args: any) => any
        ? Ref<ReturnType<T[P]>>
        : Ref<T[P]>
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

export const useGetters = <TGetters extends Record<string, any> = any>(
    ctor: { new (...args: any[]): any },
    namespaceRef?: string | Ref<string | undefined>
): GetterRefDictionary<TGetters> => {
    const result = {} as Record<string, any>
    const modRef = useModule(ctor, namespaceRef) as Ref<any>
    getGetters(ctor.prototype).forEach(gt => {
        result[gt.name] = computed(() =>
            gt.isGetter ? modRef.value[gt.name] : modRef.value[gt.name]()
        )
    })

    return result as GetterRefDictionary<TGetters>
}

const createFnCollection = (
    getKeys: (target: any) => string[],
    ctor: { new (...args: any[]): {} },
    namespaceRef?: string | Ref<string | undefined>
) => {
    const result = {} as Record<string, Function>
    const mod = useModule(ctor, namespaceRef) as Ref<any>
    getKeys(ctor.prototype).forEach(key => {
        result[key] = (...args: any) => mod.value[key](...args)
    })
    return result
}
export const useMutations = <TMutations extends {} = any>(
    ctor: { new (...args: any[]): {} },
    namespaceRef?: string | Ref<string | undefined>
): TMutations => {
    return createFnCollection(
        getAllMutationKeys,
        ctor,
        namespaceRef
    ) as TMutations
}

export const useActions = <TActions extends {} = any>(
    ctor: { new (...args: any[]): {} },
    namespaceRef?: string | Ref<string | undefined>
): TActions => {
    return createFnCollection(getAllActionKeys, ctor, namespaceRef) as TActions
}

export const useStore: () => import('vuex').Store<any> = getStore
