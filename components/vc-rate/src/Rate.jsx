import PropTypes from '../../_util/vue-types';
import classNames from '../../_util/classNames';
import KeyCode from '../../_util/KeyCode';
import {
  initDefaultProps,
  hasProp,
  getOptionProps,
  getComponent,
  findDOMNode,
} from '../../_util/props-util';
import BaseMixin from '../../_util/BaseMixin';
import { getOffsetLeft } from './util';
import Star from './Star';
import { defineComponent } from 'vue';

const rateProps = {
  disabled: PropTypes.looseBool,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  count: PropTypes.number,
  allowHalf: PropTypes.looseBool,
  allowClear: PropTypes.looseBool,
  prefixCls: PropTypes.string,
  character: PropTypes.any,
  characterRender: PropTypes.func,
  tabindex: PropTypes.number,
  autofocus: PropTypes.looseBool,
};

function noop() {}

export default defineComponent({
  name: 'Rate',
  mixins: [BaseMixin],
  inheritAttrs: false,
  props: initDefaultProps(rateProps, {
    defaultValue: 0,
    count: 5,
    allowHalf: false,
    allowClear: true,
    prefixCls: 'rc-rate',
    tabindex: 0,
    character: '★',
  }),
  data() {
    let value = this.value;
    if (!hasProp(this, 'value')) {
      value = this.defaultValue;
    }
    return {
      sValue: value,
      focused: false,
      cleanedValue: null,
      hoverValue: undefined,
    };
  },
  watch: {
    value(val) {
      this.setState({
        sValue: val,
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.autofocus && !this.disabled) {
        this.focus();
      }
    });
  },
  methods: {
    onHover(event, index) {
      const hoverValue = this.getStarValue(index, event.pageX);
      const { cleanedValue } = this;
      if (hoverValue !== cleanedValue) {
        this.setState({
          hoverValue,
          cleanedValue: null,
        });
      }
      this.__emit('hoverChange', hoverValue);
    },
    onMouseLeave() {
      this.setState({
        hoverValue: undefined,
        cleanedValue: null,
      });
      this.__emit('hoverChange', undefined);
    },
    onClick(event, index) {
      const { allowClear, sValue: value } = this;
      const newValue = this.getStarValue(index, event.pageX);
      let isReset = false;
      if (allowClear) {
        isReset = newValue === value;
      }
      this.onMouseLeave(true);
      this.changeValue(isReset ? 0 : newValue);
      this.setState({
        cleanedValue: isReset ? newValue : null,
      });
    },
    onFocus() {
      this.setState({
        focused: true,
      });
      this.__emit('focus');
    },
    onBlur() {
      this.setState({
        focused: false,
      });
      this.__emit('blur');
    },
    onKeyDown(event) {
      const { keyCode } = event;
      const { count, allowHalf } = this;
      let { sValue } = this;
      if (keyCode === KeyCode.RIGHT && sValue < count) {
        if (allowHalf) {
          sValue += 0.5;
        } else {
          sValue += 1;
        }
        this.changeValue(sValue);
        event.preventDefault();
      } else if (keyCode === KeyCode.LEFT && sValue > 0) {
        if (allowHalf) {
          sValue -= 0.5;
        } else {
          sValue -= 1;
        }
        this.changeValue(sValue);
        event.preventDefault();
      }
      this.__emit('keydown', event);
    },
    getStarDOM(index) {
      return findDOMNode(this.$refs[`stars${index}`]);
    },
    getStarValue(index, x) {
      let value = index + 1;
      if (this.allowHalf) {
        const starEle = this.getStarDOM(index);
        const leftDis = getOffsetLeft(starEle);
        const width = starEle.clientWidth;
        if (x - leftDis < width / 2) {
          value -= 0.5;
        }
      }
      return value;
    },
    focus() {
      if (!this.disabled) {
        this.$refs.rateRef.focus();
      }
    },
    blur() {
      if (!this.disabled) {
        this.$refs.rateRef.blur();
      }
    },
    changeValue(value) {
      if (!hasProp(this, 'value')) {
        this.setState({
          sValue: value,
        });
      }
      this.__emit('update:value', value);
      this.__emit('change', value);
    },
  },
  render() {
    const { count, allowHalf, prefixCls, disabled, tabindex } = getOptionProps(this);
    const { sValue, hoverValue, focused } = this;
    const { class: className, style } = this.$attrs;
    const stars = [];
    const disabledClass = disabled ? `${prefixCls}-disabled` : '';
    const character = getComponent(this, 'character');
    const characterRender = this.characterRender || this.$slots.characterRender;
    for (let index = 0; index < count; index++) {
      const starProps = {
        index,
        count,
        disabled,
        prefixCls: `${prefixCls}-star`,
        allowHalf,
        value: hoverValue === undefined ? sValue : hoverValue,
        character,
        characterRender,
        focused,
        onClick: this.onClick,
        onHover: this.onHover,
        key: index,
        ref: `stars${index}`,
      };
      stars.push(<Star {...starProps} />);
    }
    return (
      <ul
        class={classNames(prefixCls, disabledClass, className)}
        style={style}
        onMouseleave={disabled ? noop : this.onMouseLeave}
        tabindex={disabled ? -1 : tabindex}
        onFocus={disabled ? noop : this.onFocus}
        onBlur={disabled ? noop : this.onBlur}
        onKeydown={disabled ? noop : this.onKeyDown}
        ref="rateRef"
        role="radiogroup"
      >
        {stars}
      </ul>
    );
  },
});
