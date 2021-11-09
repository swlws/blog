# API



# 一、全局配置

## 1.1 错误处理

### errorHandler

```js
app.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
```



### warnHandler

```js
app.config.warnHandler = function(msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
}
```



# 二、应用API

## component

- **参数：**

  - `{string} name`
  - `{Function | Object} [definition]`

- **返回值：**

  - 如果传入 `definition` 参数，返回应用实例。
  - 如果不传入 `definition` 参数，返回组件定义。

- **用法：**

  注册或检索全局组件。注册还会使用给定的 `name` 参数自动设置组件的 `name`。

- **示例：**

```js
import { createApp } from 'vue'

const app = createApp({})

// 注册一个名为my-component的组件
app.component('my-component', {
  /* ... */
})

// 检索注册的组件(始终返回构造函数)
const MyComponent = app.component('my-component')
```



## directive

- **参数：**
  - `{string} name`
  - `{Function | Object} [definition]`
- **返回值：**
  - 如果传入 `definition` 参数，返回应用实例。
  - 如果不传入 `definition` 参数，返回指令定义。



指令钩子传递了这些参数：

**el**

指令绑定到的元素。这可用于直接操作 DOM。

**binding**

包含以下 property 的对象。

- `instance`：使用指令的组件实例。
- `value`：传递给指令的值。例如，在 `v-my-directive="1 + 1"` 中，该值为 `2`。
- `oldValue`：先前的值，仅在 `beforeUpdate` 和 `updated` 中可用。值是否已更改都可用。
- `arg`：参数传递给指令 (如果有)。例如在 `v-my-directive:foo` 中，arg 为 `"foo"`。
- `modifiers`：包含修饰符 (如果有) 的对象。例如在 `v-my-directive.foo.bar` 中，修饰符对象为 `{foo: true，bar: true}`。
- `dir`：一个对象，在注册指令时作为参数传递。例如，在以下指令中

**vnode**

上面作为 el 参数收到的真实 DOM 元素的蓝图。

**prevNode**

上一个虚拟节点，仅在 `beforeUpdate` 和 `updated` 钩子中可用。





# 三、全局API

## h

```js
h('div', {}, [
  'Some text comes first.',
  h('h1', 'A headline'),
  h(MyComponent, {
    someProp: 'foobar'
  })
])
```



## defineComponent

### 参数

- 具有组件选项的对象
- 或者是一个 `setup` 函数，函数名称将作为组件名称来使用

```js
// setup函数
import { defineComponent, ref } from 'vue'

const HelloWorld = defineComponent(function HelloWorld() {
  const count = ref(0)
  return { count }
})
```



## defineAsyncComponent

创建一个只有在需要时才会加载的异步组件。

```js
defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)
```

对于高阶用法，`defineAsyncComponent` 可以接受一个对象：

`defineAsyncComponent` 方法还可以返回以下格式的对象：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent({
  // 工厂函数
  loader: () => import('./Foo.vue'),
  // 加载异步组件时要使用的组件
  loadingComponent: LoadingComponent,
  // 加载失败时要使用的组件
  errorComponent: ErrorComponent,
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  delay: 200,
  // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
  // 默认值：Infinity（即永不超时，单位 ms）
  timeout: 3000,
  // 定义组件是否可挂起 | 默认值：true
  suspensible: false,
  /**
   *
   * @param {*} error 错误信息对象
   * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
   * @param {*} fail  一个函数，指示加载程序结束退出
   * @param {*} attempts 允许的最大重试次数
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 请求发生错误时重试，最多可尝试 3 次
      retry()
    } else {
      // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
      // 必须调用其中一个才能继续错误处理。
      fail()
    }
  }
})
```

**参考**：[动态和异步组件](https://v3.cn.vuejs.org/guide/component-dynamic-async.html)



## useCssModule



```vue
<script>
import { h, useCssModule } from 'vue'
export default {
  setup() {
    const style = useCssModule()
    return () =>
      h(
        'div',
        {
          class: style.success
        },
        'Task complete!'
      )
  }
}
</script>
<style module>
.success {
  color: #090;
}
</style>
```

关于使用 CSS 模块的更多信息，请参阅 [单文件组件样式特性：`style module`](https://v3.cn.vuejs.org/api/sfc-style.html#style-module)。



# 四、选项



## data

以 `_` 或 `$` 开头的 property 不会被组件实例代理，因为它们可能和 Vue 内置的 property、API 方法冲突。你可以使用例如 `vm.$data._property` 的方式访问这些 property。



## expose 3.2+

- **类型：** `Array<string>`

- **详细：**

  一个将暴露在公共组件实例上的 property 列表。

  默认情况下，通过 [`$refs`](https://v3.cn.vuejs.org/api/instance-properties.html#refs)、[`$parent`](https://v3.cn.vuejs.org/api/instance-properties.html#parent) 或 [`$root`](https://v3.cn.vuejs.org/api/instance-properties.html#root) 访问到的公共实例与模板使用的组件内部实例是一样的。`expose` 选项将限制公共实例可以访问的 property。

  由 Vue 自身定义的 property，比如 `$el` 和 `$parent`，将始终可以被公共实例访问，并不需要列出。

- **用法：**

  ```js
  export default {
    // increment 将被暴露，
    // 但 count 只能被内部访问
    expose: ['increment'],
  
    data() {
      return {
        count: 0
      }
    },
  
    methods: {
      increment() {
        this.count++
      }
    }
  }
  ```

- **参考：** [defineExpose](https://v3.cn.vuejs.org/api/sfc-script-setup.html#defineexpose)



## errorCaptured

- **类型：**`(err: Error, instance: Component, info: string) => ?boolean`

- **详细：**

  在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。

  TIP

  你可以在此钩子中修改组件的状态。因此在捕获错误时，在模板或渲染函数中有一个条件判断来绕过其它内容就很重要；不然该组件可能会进入一个无限的渲染循环。

  **错误传播规则**

  - 默认情况下，如果全局的 `config.errorHandler` 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报。
  - 如果一个组件的继承链或父级链中存在多个 `errorCaptured` 钩子，则它们将会被相同的错误逐个唤起。
  - 如果此 `errorCaptured` 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 `config.errorHandler`。
  - 一个 `errorCaptured` 钩子能够返回 `false` 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 `errorCaptured` 钩子和全局的 `config.errorHandler`



## extends

- **类型：**`Object`

- **详细：**

  允许一个组件扩展到另一个组件，且继承该组件选项。

  从实现的角度看，`extends` 几乎等同于 `mixins`。可以认为其作为第一个 mixin 作用在被 `extends` 的组件上。

  然而，`extends` 和 `mixins` 表达了不同的意图。`mixins` 选项主要用来组合功能，而 `extends` 主要用来考虑继承性。

  和 `mixins` 类似，任何选项都会通过对应的合并策略被合并。

- **示例：**

  ```js
  const CompA = { ... }
  
  const CompB = {
    extends: CompA,
    ...
  }
  ```

## setup

**渲染函数/JSX 的方法：**

`setup` 还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态：



**参数：**

```js
const MyComponent = {
  setup(props, context) {
    context.attrs
    context.slots
    context.emit
    context.expose
  }
}
```

> expose为vue3.2版本中新增的API



## watch

参数Options

- **选项：flush**

  `flush` 选项可以更好地控制回调的时间。它可以设置为 `'pre'`、`'post'` 或 `'sync'`。

  默认值是 `'pre'`，指定的回调应该在渲染前被调用。它允许回调在模板运行前更新了其他值。

  `'post'` 值是可以用来将回调推迟到渲染之后的。如果回调需要通过 `$refs` 访问更新的 DOM 或子组件，那么则使用该值。

  如果 `flush` 被设置为 `'sync'`，一旦值发生了变化，回调将被同步调用。

  对于 `'pre'` 和 `'post'`，回调使用队列进行缓冲。回调只被添加到队列中一次，即使观察值变化了多次。值的中间变化将被跳过，不会传递给回调。

  缓冲回调不仅可以提高性能，还有助于保证数据的一致性。在执行数据更新的代码完成之前，侦听器不会被触发。

  `'sync'` 侦听器应少用，因为它们没有这些好处。

  更多关于 `flush` 的信息，请参阅[副作用刷新时机](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#副作用刷新时机)。

## 指令

### v-pre

- **不需要表达式**

- **用法**：

  跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

- **示例**：

  ```html
  <span v-pre>{{ this will not be compiled }}</span>
  ```



### v-cloak

- **不需要表达式**

- **用法**：

  这个指令保持在元素上直到关联组件实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到组件实例准备完毕。

- **示例**：

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  不会显示，直到编译结束。

  

### [v-memo 3.2+](https://v3.cn.vuejs.org/api/directives.html#v-memo)



## ref

```html
<!-- vm.$refs.p 会是 DOM 节点 -->
<p ref="p">hello</p>

<!-- vm.$refs.child 会是子组件实例 -->
<child-component ref="child"></child-component>

<!-- 当动态绑定时，我们可以将 ref 定义为回调函数，显式地传递元素或组件实例 -->
<child-component :ref="(el) => child = el"></child-component>
```



## teleport

- **Props：**

  - `to` - `string`。需要 prop，必须是有效的查询选择器或 HTMLElement (如果在浏览器环境中使用)。指定将在其中移动 `<teleport>` 内容的目标元素

  ```html
  <!-- 正确 -->
  <teleport to="#some-id" />
  <teleport to=".some-class" />
  <teleport to="[data-teleport]" />
  
  <!-- 错误 -->
  <teleport to="h1" />
  <teleport to="some-string" />
  ```

  - `disabled` - `boolean`。此可选属性可用于禁用 `<teleport>` 的功能，这意味着其插槽内容将不会移动到任何位置，而是在你在周围父组件中指定了 `<teleport>` 的位置渲染。

  ```html
  <teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </teleport>
  ```

  

  请注意，这将移动实际的 DOM 节点，而不是被销毁和重新创建，并且它还将保持任何组件实例的活动状态。所有有状态的 HTML 元素 (即播放的视频) 都将保持其状态。



# 五、响应性基础



