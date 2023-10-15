# 几种并发 Promise 的实现

# 方案一

```js
/**
 *
 * @param {*} list 参数
 * @param {*} fn Promise函数
 * @param {*} limit 限制
 * @returns
 */
function limit_task(list, fn, limit = 3) {
  const len = list.length;

  return new Promise((r) => {
    const rt = [];
    const wrap = () => {
      if (rt.length === len) r(rt);

      if (!list.length) return;

      return fn(list.shift()).then((data) => {
        rt.push(data);
        return wrap();
      });
    };

    let i = 0;
    while (i < limit) {
      wrap();
      i++;
    }
  });
}
```

# 方案二

```ts
/**
 * 并发Promise
 *
 * @param poolLimit 并发最大数
 * @param array 参数
 * @param iteratorFn 回调函数
 * @returns
 */
async function threadPool(
  poolLimit: number,
  array: any[],
  iteratorFn: (...args: any[]) => any
) {
  const ret = []; // 存储所有的异步任务
  const executing: any[] = []; // 存储正在执行的异步任务
  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e: any = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(ret);
}
```

# 方案三

[p-limit](https://github.com/sindresorhus/p-limit/blob/main/index.js)
