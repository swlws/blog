# DOM 监测

如何定义`DOM监测`：

- 新加 DOM
- DOM 属性变更
- 移除 DOM

通常有两种方式，早期使用 DOM 事件监听节点的变化，目前已不再推荐。当前推荐使用`MutationObserver`。

# 一、DOM 事件

| 事件                        | 作用                                                                                                                                                   | 注意事项                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| DOMNodeInsertedIntoDocument | 用于检测节点的插入                                                                                                                                     | 当 Node 被插入到 Document 时，才会触发此事件                   |
| DOMNodeInserted             | 用于检测节点的插入                                                                                                                                     | 当 Node 被插入到 Document 或非 Document 时，都会被触发         |
| DOMNodeRemovedFromDocument  | 用于检测节点的移除                                                                                                                                     | 当 Node 从 Document 移除时，才会触发此事件                     |
| DOMNodeRemoved              | 用于检测节点的移除                                                                                                                                     | 当 Node 从 Document 或非 Document 时移除时，才会触发此事件     |
| DOMAttributeModified        | 用于检测 DOM 属性变化                                                                                                                                  |                                                                |
| DOMCharacterDataModified    | 检测 DOM 节点的文本变化                                                                                                                                |                                                                |
| DOMSubtreeModified          | 用于代替（DOMAttributeModified、DOMCharacterDataModified、DOMNodeInserted、DOMNodeInsertedIntoDocument、DOMNodeRemoved 和 DOMNodeRemovedFromDocument） | IE9 环境存在 BUG，当 Node 第一时间被插入时，不会立即触发此事件 |

这里的`非Document`指的是，节点不在 DOM 树上的场景。如节点存放与内存中，[Code 演示](https://github.com/swlws/blog/tree/master/202305)

# 二、MutationObserver

`MutationObserver`提供了一种监控自身节点以及子节点变化的能力，包括新增、移除、属性变化。示例：

```js
const callback = (mutationRecords) => {};
const observer = new MutationObserver(callback);

const targetNode = document.querySelector("#node");
const option = {
  subtree: false,
  childList: false,
  attributes: true,
  attributeFilter: undefined,
  attributeOldValue: false,
  characterData: false,
  characterDataOldValue: false,
};
observer.observe(targetNode, option);
```

| 配置                  | 默认值    | 说明                                       |
| --------------------- | --------- | ------------------------------------------ |
| subtree               | false     | 监听目标节点的所有后代节点                 |
| childList             | false     | 监听目标节点的新增、移除子节点的行为       |
| attributes            | false     | 监听目标节点的属性的变化                   |
| attributeFilter       | undefined | 当值为数组时，仅检测指定的属性的值的变化。 |
| attributeOldValue     | false     | 是否记录属性的旧值                         |
| characterData         | false     | 是否监控文本节点的变化                     |
| characterDataOldValue | false     | 是否记录文本节点的旧值                     |

# 三、参考

- [^1] [Event In JavaScript](http://help.dottoro.com/larrqqck.php)
- [^2] [MutationEvent](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent)
- [^3] [MutationObserver: observe()](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)
