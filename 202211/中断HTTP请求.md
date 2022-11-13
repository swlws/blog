# 中断请求

# XHR

```js
const xhr = new XMLHttpRequest();
addListeners(xhr);
xhr.open("GET", url);
xhr.send();

// 中止请求
xhr.abort();
```

# fetch

中止 fetch 的请求

## AbortController

使用`AbortController`创建一个信号，自主控制请求的中止。

```js
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
  .then((response) => {
    console.log("Download complete", response);
  })
  .catch((err) => {
    console.error(`Download error: ${err.message}`);
  });

// 中止请求
controller.abort();
```

## AbortSignal

使用`AbortSignal`创建一个超时信号

```js
try {
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
} catch (err) {
  if (err.name === "TimeoutError") {
    // ...
  } else if (err.name === "AbortError") {
    // ...
  } else if (err.name === "TypeError") {
    // AbortSignal.timeout() method is not supported
  } else {
    // A network error, or some other problem.
    console.error(`Error: type: ${err.name}, message: ${err.message}`);
  }
}
```

# Axios

## AbortController

从 v0.22.0 开始，Axios 支持以 fetch API 方式—— AbortController 中止请求：

```js
const controller = new AbortController();
const signal = controller.signal;

axios.get("/foo/bar", { signal }).then(function (response) {
  //...
});

// 中止请求
controller.abort();
```

## CancelToken deprecated

您还可以使用 cancel token 取消一个请求。

- Axios 的 cancel token API 是基于被撤销 cancelable promises proposal。
- 此 API 从 v0.22.0 开始已被弃用，不应在新项目中使用。

可以使用 CancelToken.source 工厂方法创建一个 cancel token ，如下所示：

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get("/user/12345", {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // 处理错误
    }
  });

axios.post(
  "/user/12345",
  {
    name: "new name",
  },
  {
    cancelToken: source.token,
  }
);

// 取消请求（message 参数是可选的）
source.cancel("Operation canceled by the user.");
```
