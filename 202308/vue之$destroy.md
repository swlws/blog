# vue 中的组件销毁

通常会在 vue 的生命周期 beforeDestroy 和 destroyed 中做些性能方面的处理，比如注销事件、清楚内存占用等。

vue2 中提供了`instance.$destroy`接口可以去销毁一个组件，那么`$destroy`中都做了什么呢

# vue2 的 $destroy

```js
Vue.prototype.$destroy = function () {
  const vm: Component = this;
  if (vm._isBeingDestroyed) {
    return;
  }
  callHook(vm, "beforeDestroy");
  vm._isBeingDestroyed = true;
  // remove self from parent
  const parent = vm.$parent;
  if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
    remove(parent.$children, vm);
  }
  // teardown scope. this includes both the render watcher and other
  // watchers created
  vm._scope.stop();
  // remove reference from data ob
  // frozen object may not have observer.
  if (vm._data.__ob__) {
    vm._data.__ob__.vmCount--;
  }
  // call the last hook...
  vm._isDestroyed = true;
  // invoke destroy hooks on current rendered tree
  vm.__patch__(vm._vnode, null);
  // fire destroyed hook
  callHook(vm, "destroyed");
  // turn off all instance listeners.
  vm.$off();
  // remove __vue__ reference
  if (vm.$el) {
    vm.$el.__vue__ = null;
  }
  // release circular reference (#6759)
  // https://github.com/vuejs/vue/issues/6759
  if (vm.$vnode) {
    vm.$vnode.parent = null;
  }
};
```

从源码中可以看到`$destroy`主要做了这么几件事：

1. 调用生命周期钩子`beforeDestroy`
2. 从父 VNode 中清楚自身
3. 清除自身实例上的所有 watcher
4. 触发后代组件的 `destroy` 钩子
5. 调用当前实例的所有监听事件（`$on` 事件）
6. 移除`$el`上的`__vue__`属性
7. 将组件实例标记为`_isDestroyed`

从源码实现的话，可以看到整个流程中，操作的是 VueComponent 实例的数据，
