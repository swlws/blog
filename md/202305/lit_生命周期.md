# lit

# 一 lit 是什么

`lit`提供了一种方式, 可以更快\更轻量的创建一个`web component`. 在原生的`web component`的基础上, `lit`提供了更友好的响应式生命\局部样式书写方式.

`web compoent`的生成使用`lit`实现, 具体的 UI 实现可以使用不同的技术栈(vue react angular 等)

# lit 与 web component

|              | 原生 web component                                                              | lit                                                                             |
| ------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 响应式声明   | 不支持                                                                          | 支持                                                                            |
| 样式隔离     | 支持                                                                            | 支持                                                                            |
| 渲染         | attachShadow                                                                    | render                                                                          |
| 生命周期     | connectedCallback disconnectedCallback adoptedCallback attributeChangedCallback | connectedcallback disconnectedcallback attributechangedcallback adoptedcallback |
| 响应式更新   | -                                                                               | shouldUpdate willUpdae update                                                   |
| 主动触发更新 | -                                                                               | haschanged requestUpdate                                                        |

# 二 生命周期

- connectedCallback
  - 当 DOM 从 Document 文档移除时触发
- disconnectedCallback
  - 当 DOM 挂载到 Document 文档时触发
- shouldUpdate
  - 是否允许更新
- willUpdate
  - 即将更新, 允许对响应式属性做调整
- update
  - 执行更新

父子组件之间生命周期的行为:

- 第一次 DOM 挂载时: 父 connectedCallback -> 子 connectedCallback -> 父 update(shouldUpdate willUpdate update) -> 父 update(shouldUpdate willUpdate update)
- 第二次 DOM 挂载时: 父 connectedCallback -> 子 connectedCallback
- 更新时: 父节点更新时, 不会影响子节点更新. 即仅触发父 update(shouldUpdate willUpdate update)
- DOM 卸载时: 父 disconnectedCallback -> 子 disconnectedCallback

# lit + vue

首先需要先创建一个 VUE 实例

```ts
@query(".container")
container!: HTMLDivElement;

createVueComponent = () => {
  const component = defineComponent({
    template: `
            <div>vue component</div>
        `,
  });

  const app = createApp(component);
  app.mount(this.container);
};
```

善用三个生命周期`connectedcallback disconnectedcallback update`, 通过`update`动态更新`vue 实例`.

第一次`connectedcallback`之后会触发`update`钩子, 此时`container`已被赋值, 可以执行`createVueComponent`.

```TS
protected update( changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown> ): void {
    super.update(changedProperties);

    if (this.container) {
      unmountInstance(this);
      this.createVueComponent();
    }
  }
```

[Code 完整示例](https://github.com/swlws/ui-demo/blob/master/projects/lit-ts/src/components/s-vue-component/index.ts)

# 三 参考

- [^1] [web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
- [^2] [lit lifecucle](https://lit.dev/docs/components/lifecycle/)
- [^3] [dispatch CustomEvent](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)
