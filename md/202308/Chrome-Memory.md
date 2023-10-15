# Chrome Devtools 之 Memory

# 前言

Chrome 开发者工具的“内存”面板提供了有关网页如何使用内存的信息。如果您注意到您的网站变慢了，则应将内存泄漏视为可能的原因。Chrome Memory 标签页旨在解决内存问题，包括调试 JavaScript 内存泄漏。

# Memory 面板

Memory 面板用于查找内存问题，例如内存泄漏、膨胀和垃圾回收，这些问题都会影响页面性能。通过录制快照，可以详细的查看当前页面使用情况。

支持快照类型：

- heap snapshot 堆快照
- Allocation instrumentation on timeline 时间表上的分配工具
- Allocation sampling 分配抽样

## Heap Snapshot

### 录制快照

路径：Chrome DevTools --> Memory --> Heap Snapshot --> Take Snapshot

通过上述的步骤可以录制一份当前的内存快照，开发者工具支持将已录制的快照数据存储到本地文件，同时也支持将数据导入到开发者工具。

小技巧：通过导出、导入功能，分析不同时刻下当前站点的内存使用状态，辅助内存使用分析。

### 面板内容

加载快照后，可以进一步检查 JavaScript 对象和 DOM 节点的内存分布（在拍摄快照时）。

分析数据可以从多个视图查看：

#### 概要视图（Summary View）

可以看到一个表，其中包含从它们派生的构造函数和对象（按大小、距离和保留的对象数分组）。表字段解释：

- Constructor：用于构造对象的 JavaScript 函数。
- Distance：与根的距离。距离越远，物体加载和处理所需的时间就越长。
- Shallow Size：通过特定构造函数创建的每个对象的阴影大小。
- Retained Size：一组对象中最大的保留大小

#### 包含视图（Containment View）

可以看到一张表，从对象（JavaScript 对象或 DOM 节点）的维度查看堆信息，表字段解释：

- Object：特定的 JavaScript 对象或 DOM 节点。
- Distance：一组节点中距离根节点最短的路径
- Shallow Size：通过特定构造函数创建的每个对象的 Shallow Size 之和
- Retained Size：一组对象的最大保留大小

#### 统计视图（Statistics View）

环形图，显示存在的每种类型的对象总体占用的内存量。

## Allocation instrumentation on timeline

录制操作期间新分配的内容

## Allocation sampling

Record memory allocation using sampling method. this profile type has minimal performance overhead and can be used for long running operations. it provide good approximation of allocations broken down by javascript execution stack.

使用采样方法记录内存分配。这种配置文件类型的性能开销最小，可以用于长时间运行的操作。它提供了 javascript 执行堆栈分解的分配的良好近似。

表字段解释：

- Self Size: 函数本身使用的内存。
- Total Size: 函数所属集合使用的内存。
- Function: 在操作中被记录的函数。

# 何时会出现内存泄漏

- 意外的全局变量
- Detached DOM Nodes 分离的 DOM 节点
- 闭包

# 案例

# 总结

- [^1][Chrome Memory Tab: Learn to Find JavaScript Memory Leaks](https://www.bitdegree.org/learn/chrome-memory-tab#chrome-memory-tab-main-tips)
- [^2][JavaScript Memory Profiling](https://github.com/GoogleChrome/devtools-docs/blob/master/docs/javascript-memory-profiling.md)
- [^3][Record heap snapshots](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots/)
- [^4][How to Use the Allocation Profiler Tool](https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler/)
