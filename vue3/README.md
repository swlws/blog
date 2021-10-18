# vue3-中文文档阅读

- 地址：https://v3.cn.vuejs.org/guide/introduction.html



# 一、计算属性添加`set`方法

```js
computed: {
  v2: {
    get() {
      return this.v;
    },
      set(v) {
        this.v = v;
      },
  },
},

```



# 二、条件渲染

## v-if

- 是“真正”的条件渲染，因为它会确保在切换过程中，条件块内的事件监听器和子组件适当地被销毁和重建。
- 可以使用在`<template>` 元素上。
- 也是**惰性的**，如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。



## v-show 

- 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS（ `display`） 进行切换
- 不支持 `<template>` 元素



# 三、KEY的作用 - [link](https://v3.cn.vuejs.org/api/special-attributes.html#key)

1. 主要用做 Vue 的虚拟 DOM 算法的提示，以在比对新旧节点组时辨识 VNodes

2. 用于强制替换元素/组件而不是重复使用它，如下场景时它可能会很有用：
   1. 完整地触发组件的生命周期钩子
   2. 触发过渡

eg：

```
<transition>
  <span :key="text">{{ text }}</span>
</transition>
```

```html
<transition>
  <span :key="text">{{ text }}</span>
</transition>
```



# 四、事件处理

## 4.1 $event

有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法：

```html
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
// ...
methods: {
  warn(message, event) {
    // 现在可以访问到原生事件
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```



## 4.2 多事件

事件处理程序中可以有多个方法，这些方法由逗号运算符分隔：

```html
<!-- 这两个 one() 和 two() 将执行按钮点击事件 -->
<button @click="one($event), two($event)">
  Submit
</button>
```



## 4.3 事件修饰符

| 修饰符  | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| stop    | <!-- 阻止单击事件继续传播 --><br /><a @click.stop="doThis"></a> |
| prevent | <!-- 提交事件不再重载页面 --> <br /><form @submit.prevent="onSubmit"></form> |
| capture | <!-- 添加事件监听器时使用事件捕获模式 --> <br /><!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 --> <br /><div @click.capture="doThis">...</div> |
| self    | <!-- 只当在 event.target 是当前元素自身时触发处理函数 --> <br /><!-- 即事件不是从内部元素触发的 --> <br /><div @click.self="doThat">...</div> |
| once    | <!-- 点击事件将只会触发一次 --> <br /><a @click.once="doThis"></a> |
| passive | <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发   --> <br /><!-- 而不会等待 `onScroll` 完成                   --> <br /><!-- 这其中包含 `event.preventDefault()` 的情况   --> <br /><div @scroll.passive="onScroll">...</div> |
|         |                                                              |



## 4.4 按键修饰符

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`



## 4.5 系统修饰符

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)



## 4.6 鼠标按钮修饰符

- `.left`
- `.right`
- `.middle`



## 4.7 `.exact` 修饰符

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```



# 五、表单

## 5.1 修饰符

### `.lazy`

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了[上述](https://v3.cn.vuejs.org/guide/forms.html#vmodel-ime-tip)输入法组织文字时)。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件_之后_进行同步



### `.number`

如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符



### `.trim`

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符



# 六、组件



## 6.1 v-model

**表单元素上使用v-model**

```html
<input v-model="searchText" />
```

等价于：

```html
<input :value="searchText" @input="searchText = $event.target.value" />
```

**组件上使用`v-model`**

 不指定变量时，默认使用`model-value`

```html
<custom-input v-model="searchText"></custom-input>
```

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input v-model="value">
  `,
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) { 
        this.$emit('update:modelValue', value)
      }
    }
  }
})
```

手动指定变量

```html
<custom-input2 v-model:value="searchText2"></custom-input2>
```

```js
app.component("custom-input2", {
  props: ["value"],
  emits: ["update:value"],
  template: `
<input v-model="value2">
`,
  computed: {
    value2: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
      },
    },
  },
});
```



## 6.2 Element Placement Restrictions

`blog-post-row`是一个自定义组件

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```



## 6.3 Props

### 6.3.1 动态传值

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```html
<blog-post v-bind="post"></blog-post>
```

等价于：

```html
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
```



### 6.3.2 Prop验证

```js
// 自定义验证函数
propF: {
  validator(value) {
    // 这个值必须匹配下列字符串中的一个
    return ['success', 'warning', 'danger'].includes(value)
  }
},
```



## 6.4 v-model自定义的修饰符

### 场景一：不带变量

```html
<my-component v-model.capitalize="myText"></my-component>
```



```js
props: {
  modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
},
emits: ['update:modelValue'],
```

修饰符会自动存储在`modelModifiers`中

### 场景二：带变量

对于带参数的 `v-model` 绑定，生成的 prop 名称将为 `arg + "Modifiers"`：

```html
<my-component v-model:description.capitalize="myText"></my-component>
```

```js
props: ['description', 'descriptionModifiers'],
emits: ['update:description'],
```



# 七、插槽

```html
// 具名插槽、备用内容、作用域
<slot name="header" data="{name:'xxx'}">这是一个插槽</slot>

// 插槽引用
<template v-slot:header="props">
	<div>
    {{props.data}}
  </div>
</template>
```

具名插槽的缩写

> v-slot  ===>  #default
>
> v-slot:heaer  ===>  #header



# 八、Provide / Inject

特性：

- 父组件有一个 `provide` 选项来提供数据
- 子组件有一个 `inject` 选项来开始使用这些数据

```js
// 父组件提供的数据
provide: {
  user: 'John Doe',
  cb: () => 'John Doe',
  // 默认情况下，provide/inject 绑定并不是响应式的。
  // 我们可以通过传递一个 ref property 或 reactive 对象给 provide 来改变这种行为处理为响应式的
  todoLength: Vue.computed(() => this.todos.length)
}
provide(){
  return {
    user: 'John Doe',
    cb: () => 'John Doe',
    // 默认情况下，provide/inject 绑定并不是响应式的。
    // 我们可以通过传递一个 ref property 或 reactive 对象给 provide 来改变这种行为处理为响应式的
    todoLength: Vue.computed(() => this.todos.length)
  }
}

// 子组件引用数据
inject: ["user"]
```



# 九、keep-alive

```vue-html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```



# 十、过渡 & 动画



## 10.1 进入过渡 & 离开过渡

![Transition Diagram](https://v3.cn.vuejs.org/images/transitions.svg)

过渡模式：

- out-in
- In-out



## 10.2 列表过渡

- 默认情况下，它不会渲染一个包裹元素，但是你可以通过 `tag` attribute 指定渲染一个元素。
- [过渡模式](https://v3.cn.vuejs.org/guide/transitions-enterleave.html#过渡模式)不可用，因为我们不再相互切换特有的元素。
- 内部元素**总是需要**提供唯一的 `key` attribute 值。
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。



### 10.2.1 列表的移动过渡

```html
<transition-group name="list" tag="p">
  <span v-for="item in items" :key="item" class="list-item">
    {{ item }}
  </span>
</transition-group>
```



```css
.list-item {
  // 列表项自身添加过渡
  transition: all 0.8s ease;
  display: block;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
  // 这里需修改定位absolute
  position: absolute;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
```



# 十一、Composition API

## 11.1 setup

## 参数:

1. props
2. context



### props

- props是响应式的
- 因为 `props` 是响应式的，你**不能使用 ES6 解构**，它会消除 prop 的响应性。

在`props`上使用解构，同时保持响应式，方式：

```js
 const { title } = toRefs(props)
 
 const title = toRef(props, 'title')
```



### context

`context` 是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对 `context` 使用 ES6 解构。

```js
type context = {
  attrs: any; // Attribute (非响应式对象，等同于 $attrs)
  slots: any; // 插槽 (非响应式对象，等同于 $slots)
  emit: any; // 触发事件 (方法，等同于 $emit)
  expose: any; // // 暴露公共 property (函数)
}
```



## 返回值

1. 对象
2. 函数



当返回值为对象时，`template`模板中访问时是[被自动浅解包](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html#ref-解包)的，因此不应在模板中使用 `.value`。

当返回是函数时：

```js
import { h, ref } from 'vue'
export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

使用`expose`向外部暴露函数



## 11.2 生命周期钩子

| 选项式 API        | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |



## 11.3 provide & inject

`provide` 函数允许你通过两个参数定义 property：

1. name (`<String>` 类型)
2. value



`inject` 函数有两个参数：

1. 要 inject 的 property 的 name
2. 默认值 (**可选**)



## 11.4 模板引用（ref）

### 单个引用

```html
<template> 
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      return {
        root
      }
    }
  }
</script>
```



### 多个引用

```html
<template>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
  import { ref, reactive, onBeforeUpdate } from 'vue'

  export default {
    setup() {
      const list = reactive([1, 2, 3])
      const divs = ref([])

      // 确保在每次更新之前重置ref
      onBeforeUpdate(() => {
        divs.value = []
      })

      return {
        list,
        divs
      }
    }
  }
</script>
```



## 11.5 自定义指令

### 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `created`：在绑定元素的 attribute 或事件监听器被应用之前调用。在指令需要附加须要在普通的 `v-on` 事件监听器前调用的事件监听器时，这很有用。
- `beforeMount`：当指令第一次绑定到元素并且在挂载父组件之前调用。
- `mounted`：在绑定元素的父组件被挂载后调用。
- `beforeUpdate`：在更新包含组件的 VNode 之前调用。

- `updated`：在包含组件的 VNode **及其子组件的 VNode** 更新后调用。
- `beforeUnmount`：在卸载绑定元素的父组件之前调用
- `unmounted`：当指令与元素解除绑定且父组件已卸载时，只调用一次。



函数简写， `mounted` 和 `updated` 会触发同一行为

```js
app.directive('pin', (el, binding) => {
  el.style.position = 'fixed'
  const s = binding.arg || 'top'
  el.style[s] = binding.value + 'px'
})
```



## 11.6 Teleport

```html
<teleport to="body">
  <div>hello</div>     
</teleport>
```

将内容移动到指定元素的里面。值为`标签名`或者`ID`



## 11.7 渲染函数

通过render函数绘制页面



### 11.7.1 render函数

返回值：

- string
- h()



### 11.7.2 h函数

#### 创建非组件VNode

```js
h(
  'a',
  {
    name: headingId,
    href: '#' + headingId
  },
  this.$slots.default()
)
```



#### 创建组件VNode

**方式一：**

```js
h(ButtonCounter)
```

**方式二：**

```js
const ButtonCounter = resolveComponent('ButtonCounter')
h(ButtonCounter)
```



### 11.7.3 JSX

```jsx
render() {
  return (
    <AnchoredHeading level={1}>
    	<span>Hello</span> world!
		</AnchoredHeading>
	)
}
```



### 11.7.4 函数式组件

```js
const FunctionalComponent = (props, context) => {
  // ...
}
// 函数式组件的Props定义
FunctionalComponent.props = ['value']
// 函数式组件的emits定义
FunctionalComponent.emits = ['click']
```

第二个参数 `context` 包含三个 property：`attrs`、`emit` 和 `slots`。它们分别相当于实例的 [`$attrs`](https://v3.cn.vuejs.org/api/instance-properties.html#attrs)、[`$emit`](https://v3.cn.vuejs.org/api/instance-methods.html#emit) 和 [`$slots`](https://v3.cn.vuejs.org/api/instance-properties.html#slots) 这几个 property。



# 十二、插件

一般有下面几种：

1. 添加全局方法或者 property。如：[vue-custom-element](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源：指令/过渡等。如：[vue-touch](https://github.com/vuejs/vue-touch)）
3. 通过全局 mixin 来添加一些组件选项。(如[vue-router](https://github.com/vuejs/vue-router))
4. 添加全局实例方法，通过把它们添加到 `config.globalProperties` 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)



`app.vue`接收的参数:

```typescript
type PluginInstallFunction = (app: App, ...options: any[]) => any;
type Plugin_2 = (PluginInstallFunction & {
    install?: PluginInstallFunction;
}) | {
    install: PluginInstallFunction;
};
use(plugin: Plugin_2, ...options: any[]): this;
```



`app.use`会自动阻止你多次使用同一插件，因此在同一插件上多次调用只会安装一次该插件。



## 十三、使用 Vue 构建自定义元素

[link - 使用 Vue 构建自定义元素](https://v3.cn.vuejs.org/guide/web-components.html#%E4%BD%BF%E7%94%A8-vue-%E6%9E%84%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E5%85%83%E7%B4%A0)



# 十四、响应式

vue3使用proxy实现响应式系统

**watch的简单实现：**

```js
const runningEffects = [];

function createEffect(fn) {
  // 将传来的 fn 包裹在一个副作用函数中
  const effect = () => {
    runningEffects.push(effect);
    fn();
    runningEffects.pop();
  };

  // 立即自动执行副作用
  effect();
}

// 记录reactive对象、及引用了reactive对象的函数
let callEffect = [];

/**
 * 收集变化
 *
 * @param {*} target
 * @param {*} property
 * @returns
 */
function track(target, property) {
  for (let item of callEffect) {
    // 已经存在了 则不再添加
    if (item.target === target && item.property === property) {
      return;
    }
  }

  console.log("track", target, property);

  let effect = runningEffects[runningEffects.length - 1];
  if (!effect) return;

  callEffect.push({
    target,
    property,
    fn: effect,
  });
}

/**
 * 触发变化
 *
 * @param {*} target
 * @param {*} property
 */
function trigger(target, property) {
  console.log("trigger", target, property);

  for (let item of callEffect) {
    if (item.target === target && item.property === property) {
      item.fn();
    }
  }
}

/**
 * 响应式对象
 *
 * @param {*} obj
 * @returns
 */
function reactive(obj) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      track(target, property);

      return Reflect.get(...arguments);
    },
    set(target, property, value, reveiver) {
      let res = Reflect.set(...arguments);

      // Reflect在triiger之前，修改了值之后再触发effect
      trigger(target, property, value);
      return res;
    },
  });
}

let v1 = reactive({ v: 1, name: "v1" });
let v2 = reactive({ v: 2, name: " v2" });

createEffect(() => {
  let v = v1.v + v2.v;
  console.log("emit effect", v);
});

let timer = setInterval(() => {
  console.log();
  v1.v += 10;
}, 1000);

```

