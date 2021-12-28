# SASS Or SCSS

早已忘记何时、何因开始使用`scss`，记忆的深处早期对`scss`的感官是，有个叫`node-sass`的库总是安装不了，被`py`支配的恐惧。重温下`scss`的文档，回顾下 API。

# 一、安装与编译

依赖环境`ruby`，自行安装运行时。

## 1.1 安装

linux 下安装命令

> gem install sass // 使用 ruby 的包管理工具安装
>
> sass -v // 验证是否安装成功

## 1.2 交互式 shell

sass 提供了`SassScript`能够执行：

- 运算符。+ - \* / boolean arry
- 字符串操作。eg：颜色运算、单位运算、
- 变量操作
- 括号
- 插槽 #{}
- 函数。eg:hsl
- &
- !default

进入交互式命令界面的命令：

> sass -i

## 1.3 编译

sass 能够将`sass`、`scss`文件编译为`css`文件，两种方式：

```
//单文件转换命令
sass input.scss output.css

//单文件监听命令
sass --watch input.scss:output.css

//如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
sass --watch app/sass:public/stylesheets
```

更多编译参数查看：

> sass -h

### 编译工具

- Koala
- VSCode 的扩展插件，Live Sass

# 二、语法

## 2.1 规则嵌套

```scss
html {
  > body {
    header {
      color: #333;
    }

    section {
      margin: 10px;
    }
  }
}
```

## 2.2 父选择器&

```scss
a {
  &:hover {
    text-decoration: underline;
  }
}
```

## 2.3 嵌套属性

```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

## 2.4 SassScript

进入交互式 shell，执行命令

> sass -i

### 2.5.1 变量 $

> $color: red

### 2.5.2 数据类型

- 数字，`1, 2, 13, 10px`
- 字符串，有引号字符串与无引号字符串，`"foo", 'bar', baz`
- 颜色，`blue, #04a3f9, rgba(255,0,0,0.5)`
- 布尔型，`true, false`
- 空值，`null`
- 数组 (list)，用空格或逗号作分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- maps, 相当于 JavaScript 的 object，`(key1: value1, key2: value2)`

### 2.5.3 运算

支持 == 、 != 、+、 -、 \*、 /、 %

## 2.3 指令

- 拓展原有 CSS 的指令
- 控制指令
- 混合指令
- 函数指令
- 调试指令

### 2.3.1 CSS 中指令的扩展

#### @import

通常，`@import` 寻找 Sass 文件并将其导入，但在以下情况下，`@import` 仅作为普通的 CSS 语句，不会导入任何 Sass 文件。

- 文件拓展名是 `.css`；
- 文件名以 `http://` 开头；
- 文件名是 `url()`；
- `@import` 包含 media queries。

如果不是以上情况，文件的拓展名是 `.scss` 或 `.sass`，则导入成功。例如

> // page.scss
>
> import "foo" // 将导入 foo.scss 或 foo.sass 或 \_foo.scss 或 \_foo.sass

如果，将文件命名为 `_foo.scss`，便不会编译为 `_foo.css` 文件，但文件确实被导入到了`page.scss`文件

#### @media

Sass 中 `@media` 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。如果 `@media` 嵌套在 CSS 规则内，编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 `@media` 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程。

#### @extend

继承的规则有点复杂，如果使用，尽量不要继承`后代选择器`

### 2.3.2 控制指令

#### @if 和 @else

```scss
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

#### @for

`@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：`@for $var from <start> through <end>`，或者 `@for $var from <start> to <end>`，区别在于 `through` 与 `to` 的含义：_当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值_。另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值。

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
```

#### @each

`@each` 指令的格式是 `$var in <list>`, `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url("/images/#{$animal}.png");
  }
}
```

二维数组：

```scss
@each $animal, $color, $cursor in (puma, black, default), (
    sea-slug,
    blue,
    pointer
  ), (egret, white, move)
{
  .#{$animal}-icon {
    background-image: url("/images/#{$animal}.png");
    border: 2px solid $color;
    cursor: $cursor;
  }
}
```

#### @while

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
```

### 2.3.3 混合指令

#### @mixin 和@include

定义 CSS 片段，然后在其它地方调用.

```scss
@mixin button {
  font-weight: bold;
  @content;
}

.button {
  color: green;
  @include button {
    font-size: 12px;
  }
}
```

`@content`存在时，`@include`中的值可以替换`@content`

**参数：**

```scss
@mixin button($color) {
  color: $color;
}

.button {
  @include button(red);
}
```

**不确定的参数：**

```scss
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

### 2.3.4 函数指令

```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar {
  width: grid-width(5);
}
```

### 2.4.5 调试指令

#### @debug

> @debug “this is a debug”

#### @warn

> @debug “this is a warn”
