## API

```html
<template>
  <a-menu>
    <a-menu-item>菜单项</a-menu-item>
    <a-sub-menu title="子菜单">
      <a-menu-item>子菜单项</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
```

### Menu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组 |  |  |  |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 | string\[] |  |  |
| forceSubMenuRender | 在子菜单展示之前就渲染进 DOM | boolean | false |  |
| inlineCollapsed | inline 时菜单是否收起状态 | boolean | - |  |
| inlineIndent | inline 模式的菜单缩进宽度 | number | 24 |  |
| mode | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | string: `vertical` `vertical-right` `horizontal` `inline` | `vertical` |  |
| multiple | 是否允许多选 | boolean | false |  |
| openKeys(v-model) | 当前展开的 SubMenu 菜单项 key 数组 | string\[] |  |  |
| selectable | 是否允许选中 | boolean | true |  |
| selectedKeys(v-model) | 当前选中的菜单项 key 数组 | string\[] |  |  |
| subMenuCloseDelay | 用户鼠标离开子菜单后关闭延时，单位：秒 | number | 0.1 |  |
| subMenuOpenDelay | 用户鼠标进入子菜单后开启延时，单位：秒 | number | 0 |  |
| theme | 主题颜色 | string: `light` `dark` | `light` |  |
| overflowedIndicator | 自定义 Menu 折叠时的图标 | DOM | `<span>···</span>` |  |
| selectedColor | 高亮选中字体颜色 | string | #1890ff | 3.36.0 |
| selectedBgColor | 高亮选中背景颜色 | string | #e6f7ff | 3.36.0 |
| selectedBorderColor | 高亮选中边框颜色 | string | #1890ff | 3.36.0 |

### Menu 事件

| 事件名称   | 说明                               | 回调参数                              |
| ---------- | ---------------------------------- | ------------------------------------- |
| click      | 点击 MenuItem 调用此函数           | function({ item, key, keyPath })      |
| deselect   | 取消选中时调用，仅在 multiple 生效 | function({ item, key, selectedKeys }) |
| openChange | SubMenu 展开/关闭的回调            | function(openKeys: string\[])         |
| select     | 被选中时调用                       | function({ item, key, selectedKeys }) |

### Menu.Item

| 参数     | 说明                     | 类型    | 默认值 |
| -------- | ------------------------ | ------- | ------ |
| disabled | 是否禁用                 | boolean | false  |
| key      | item 的唯一标志          | string  |        |
| title    | 设置收缩时展示的悬浮标题 | string  |        |

### Menu.SubMenu

| 参数           | 说明       | 类型         | 默认值 | 版本  |
| -------------- | ---------- | ------------ | ------ | ----- |
| popupClassName | 子菜单样式 | string       |        | 1.5.0 |
| disabled       | 是否禁用   | boolean      | false  |       |
| key            | 唯一标志   | string       |        |       |
| title          | 子菜单项值 | string\|slot |        |       |
| expandIcon          | 自定义 Menu 展开收起图标 | slot |        |  |

Menu.SubMenu 的子元素必须是 `MenuItem` 或者 `SubMenu`.

### SubMenu 事件

| 事件名称   | 说明           | 回调参数            |
| ---------- | -------------- | ------------------- |
| titleClick | 点击子菜单标题 | ({ key, domEvent }) |

### Menu.ItemGroup

| 参数  | 说明     | 类型                     | 默认值 |
| ----- | -------- | ------------------------ | ------ |
| title | 分组标题 | string\|\|function\|slot |        |

Menu.ItemGroup 的子元素必须是 `MenuItem`.

### Menu.Divider

菜单项分割线，只用在弹出菜单内。
