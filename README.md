# Classy Vuex Hooks

Vue composition api hooks for `classy-vuex` modules.

Currently compatible

Consult the `classy-vuex` README for documentation on writing modules.

This adds two functions to use as hooks for the new vue composition api: `useModule` and `useMappedModule`, which both work similar to `classy-vuex`'s `getModule` function, but for hooks.

## useModule

This function takes a module constructor and optionally a namespace (or ref to a namespace) and returns a ref to the module instance. If a ref is used for the namespace, the module can update when the namespace ref udpates.

## useMappedModule

This function can be used like the `mapComputed` and `mapMethods` functions of `classy-vuex`. Pass a module constructor and optionally a namespace, and the result can be mapped to the `setup` return object, allowing all of the modules states, getters, mutations and actions to be passed to setup for a component.

## Dynamic Modules

Both hooks can be used to dynamically register a module on demand. By supplying a factory function as a third argument, the module will be created if it does not already exist at the given namespace.
