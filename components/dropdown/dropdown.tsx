import { provide, inject, cloneVNode, defineComponent, VNode } from 'vue';
import RcDropdown from '../vc-dropdown/src/index';
import DropdownButton from './dropdown-button';
import PropTypes from '../_util/vue-types';
import { cloneElement } from '../_util/vnode';
import classNames from '../_util/classNames';
import {
  getOptionProps,
  getPropsData,
  getComponent,
  isValidElement,
  getSlot,
} from '../_util/props-util';
import getDropdownProps from './getDropdownProps';
import { defaultConfigProvider } from '../config-provider';
import RightOutlined from '@ant-design/icons-vue/RightOutlined';

const DropdownProps = getDropdownProps();
const Dropdown = defineComponent({
  name: 'ADropdown',
  inheritAttrs: false,
  props: {
    ...DropdownProps,
    prefixCls: PropTypes.string,
    mouseEnterDelay: PropTypes.number.def(0.15),
    mouseLeaveDelay: PropTypes.number.def(0.1),
    placement: DropdownProps.placement.def('bottomLeft'),
    onVisibleChange: PropTypes.func,
    'onUpdate:visible': PropTypes.func,
  },
  emits: ['visibleChange', 'update:visible'],
  setup() {
    return {
      configProvider: inject('configProvider', defaultConfigProvider),
      popupRef: null,
    };
  },
  created() {
    provide('savePopupRef', this.savePopupRef);
  },
  methods: {
    savePopupRef(ref: VNode) {
      this.popupRef = ref;
    },
    getTransitionName() {
      const { placement = '', transitionName } = this.$props;
      if (transitionName !== undefined) {
        return transitionName;
      }
      if (placement.includes('top')) {
        return 'slide-down';
      }
      return 'slide-up';
    },
    renderOverlay(prefixCls: string) {
      const overlay = getComponent(this, 'overlay');
      const overlayNode = Array.isArray(overlay) ? overlay[0] : overlay;
      // menu cannot be selectable in dropdown defaultly
      // menu should be focusable in dropdown defaultly
      const overlayProps = overlayNode && getPropsData(overlayNode);
      const { selectable = false, focusable = true } = (overlayProps || {}) as any;
      const expandIcon = (
        <span class={`${prefixCls}-menu-submenu-arrow`}>
          <RightOutlined class={`${prefixCls}-menu-submenu-arrow-icon`} />
        </span>
      );

      const fixedModeOverlay = isValidElement(overlayNode)
        ? cloneVNode(overlayNode, {
            mode: 'vertical',
            selectable,
            focusable,
            expandIcon,
          })
        : overlay;
      return fixedModeOverlay;
    },
    handleVisibleChange(val: boolean) {
      this.$emit('update:visible', val);
      this.$emit('visibleChange', val);
    },
  },

  render() {
    const props = getOptionProps(this);
    const { prefixCls: customizePrefixCls, trigger, disabled, getPopupContainer } = props;
    const { getPopupContainer: getContextPopupContainer } = this.configProvider;
    const getPrefixCls = this.configProvider.getPrefixCls;
    const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
    const child = getSlot(this)[0];
    const dropdownTrigger = cloneElement(child, {
      class: classNames(child?.props?.class, `${prefixCls}-trigger`),
      disabled,
    });
    const triggerActions = disabled ? [] : trigger;
    let alignPoint;
    if (triggerActions && triggerActions.includes('contextmenu')) {
      alignPoint = true;
    }
    const dropdownProps = {
      alignPoint,
      ...props,
      ...this.$attrs,
      prefixCls,
      getPopupContainer: getPopupContainer || getContextPopupContainer,
      transitionName: this.getTransitionName(),
      trigger: triggerActions,
      overlay: this.renderOverlay(prefixCls),
      onVisibleChange: this.handleVisibleChange,
    };
    return <RcDropdown {...dropdownProps}>{dropdownTrigger}</RcDropdown>;
  },
});

Dropdown.Button = DropdownButton;
export default Dropdown;
export { DropdownProps };
