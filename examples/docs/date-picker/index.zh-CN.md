## API

日期类组件包括以下四种形式。

- DatePicker
- MonthPicker
- RangePicker
- WeekPicker
- YearPicker

### 国际化配置

默认配置为 en-US，如果你需要设置其他语言，推荐在入口处使用我们提供的国际化组件，详见：[ConfigProvider 国际化](https://2x.antdv.com/components/date-picker-cn)。

如有特殊需求（仅修改单一组件的语言），请使用 locale 参数，参考：[默认配置](https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json)。

**注意：**DatePicker、MonthPicker、RangePicker、WeekPicker、YearPicker 部分 locale 是从 value 中读取，所以请先正确设置 moment 的 locale。


### 共同的 API

以下 API 为 DatePicker、MonthPicker、RangePicker, WeekPicker, YearPicker 共享的 API。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 是否显示清除按钮 | boolean | true | - |
| autoFocus | 自动获取焦点 | boolean | false | - |
| dateRender | 作用域插槽，自定义日期单元格的内容 | slot="dateRender" slot-scope="current, today" | - | - |
| disabled | 禁用 | boolean | false | - |
| disabledDate | 不可选择的日期 | (currentDate: moment) => boolean | 无 | - |
| getCalendarContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | 无 | - |
| locale | 国际化配置 | object | [默认配置](https://github.com/vueComponent/ant-design-vue/blob/master/components/date-picker/locale/example.json) | - |
| mode | 日期面板的状态（[设置后无法选择年份/月份？](/docs/vue/faq#当我指定了-DatePicker/RangePicker-的-mode-属性后，点击后无法选择年份/月份？)） | `time|date|month|year|decade` | 'date' | - |
| open | 控制弹层是否展开 | boolean | - | - |
| placeholder | 输入框提示文字 | string\|RangePicker\[] | - | - |
| popupStyle | 额外的弹出日历样式 | object | {} | - |
| dropdownClassName | 额外的弹出日历 className | string | - | - |
| size | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | string | 无 | - |
| suffixIcon | 自定义的选择框后缀图标 | VNode \| slot | - | - |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | boolean | - | 1.5.4 |
| align | 该值将合并到 placement 的配置中，设置参考 [dom-align](https://github.com/yiminghe/dom-align) | Object | 无 | 1.5.4 |
| valueFormat | 可选，绑定值的格式，对 value、defaultValue、defaultPickerValue 起作用。不指定则绑定值为 moment 对象 | string，[具体格式](https://momentjs.com/docs/#/displaying/format/) | - | 1.5.4 |


### 共有的事件

| 事件名称    | 说明                     | 回调参数              |
| ----------- | ------------------------ | --------------------- |
| openChange  | 弹出日历和关闭日历的回调 | function(status)      |
| panelChange | 日期面板变化时的回调     | function(value, mode) | - |

### 共同的方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

### DatePicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |
| defaultPickerValue | 默认面板日期 | [moment](http://momentjs.com/) | 无 |
| disabledTime | 不可选择的时间 | function(date) | 无 |
| format | 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 [moment.js](http://momentjs.com/) | string \| string[] | "YYYY-MM-DD" |
| renderExtraFooter | 在面板中添加额外的页脚 | slot="renderExtraFooter" slot-scope="mode" | - |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker-cn/#API) |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒 | [moment](http://momentjs.com/) | moment() |
| showToday | 是否展示“今天”按钮 | boolean | true |
| value(v-model) | 日期 | [moment](http://momentjs.com/) | 无 |

### DatePicker 事件

| 事件名称 | 说明               | 回调参数                                             |
| -------- | ------------------ | ---------------------------------------------------- |
| change   | 时间发生变化的回调 | function(date: moment \| string, dateString: string) |
| ok       | 点击确定按钮的回调 | function()                                           |

### YearPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |
| defaultPickerValue | 默认面板日期 | [moment](http://momentjs.com/) | 无 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY" |
| value(v-model) | 日期 | [moment](http://momentjs.com/) | 无 |

### YearPicker 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment \| string, dateString: string) |

### MonthPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | 无 |
| defaultPickerValue | 默认面板日期 | [moment](http://momentjs.com/) | 无 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-MM" |
| monthCellContentRender | 自定义的月份内容渲染方法 | slot="monthCellContentRender" slot-scope="date, locale" | - |
| renderExtraFooter | 在面板中添加额外的页脚 | slot="renderExtraFooter" slot-scope="mode" | - |
| value(v-model) | 日期 | [moment](http://momentjs.com/) | 无 |

### MonthPicker 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment \| string, dateString: string) |

### WeekPicker

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/) | - |
| defaultPickerValue | 默认面板日期 | [moment](http://momentjs.com/) | 无 |
| format | 展示的日期格式，配置参考 [moment.js](http://momentjs.com/) | string | "YYYY-wo" |
| value(v-model) | 日期 | [moment](http://momentjs.com/) | - |
| renderExtraFooter | 在面板中添加额外的页脚 | slot="renderExtraFooter" slot-scope="mode" | - |

### WeekPicker 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment \| string, dateString: string) |

### RangePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认日期 | [moment](http://momentjs.com/)\[] | 无 |  |
| defaultPickerValue | 默认面板日期 | [moment](http://momentjs.com/)\[] | 无 |  |
| disabledTime | 不可选择的时间 | function(dates: \[moment, moment\], partial: `'start'|'end'`) | 无 |  |
| format | 展示的日期格式 | string | "YYYY-MM-DD HH:mm:ss" |  |
| ranges       | 预设时间范围快捷选择 | { \[range: string]: [moment](http://momentjs.com/)\[] } \| { \[range: string]: () => [moment](http://momentjs.com/)\[] } | 无 |  |
| renderExtraFooter | 在面板中添加额外的页脚 | slot="renderExtraFooter" slot-scope="mode" | - |  |
| separator | 设置分隔符 | string | '~' | 1.5.0 |
| showTime | 增加时间选择功能 | Object\|boolean | [TimePicker Options](/components/time-picker-cn/#API) |  |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒 | [moment](http://momentjs.com/)\[] | \[moment(), moment()] |  |
| value(v-model) | 日期 | [moment](http://momentjs.com/)\[] | 无 |  |
| timeRounding | 开始时间是 00:00:00 结束时间 23:59:59 | boolean | - | 3.46.0 |

### RangePicker 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| calendarChange | 待选日期发生变化的回调 | function(dates: \[moment, moment\] \| \[string, string\], dateStrings: \[string, string\]) |
| change | 日期范围发生变化的回调 | function(dates: \[moment, moment\] \| \[string, string\], dateStrings: \[string, string\]) |
| ok | 点击确定按钮的回调 | function(dates: \[moment, moment\] \| \[string, string\]) |
