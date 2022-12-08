# TypeScript Concept

# 一、类型系统

`TypeScript`是`JavaScript`的超集，支持`JavaScript`所有特性。

# 二、定义类型

```ts
interface User {
  name: string;
  id: number;
}
```

# 三、联合组合（union type）

```ts
type MyBool = true | false;
```

范型（generic type）

```ts
type StringArray = Array<string>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
```

# 四、结构类型系统

TS 中检查两个类型是否相同，仅比对结构（shape）是否相同，示例：

```ts
interface PointA {
  x: number;
  y: number;
}

interface PointB {
  x: number;
  y: number;
}

// PointA、PointB是完全相同的两个类型
```

# 五、`type`与`interface`的差异

`type`与`interface`非常相似，大多数情况下，可以任意使用。唯一的区别是，前者不能再添加新的属性，后者可以随意扩展。

## 5.1 继承

interface 的实现

```ts
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

type 的实现

```ts
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;
```

## 5.2 扩展新属性

interface 的实现

```ts
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

type 不支持扩展

```ts
type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};

// Error: Duplicate identifier 'Window'.
```
