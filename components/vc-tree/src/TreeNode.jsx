import { defineComponent, inject, provide } from 'vue';
import PropTypes from '../../_util/vue-types';
import classNames from '../../_util/classNames';
import { getNodeChildren, mapChildren, warnOnlyTreeNode, getDataAndAria } from './util';
import { initDefaultProps, getComponent, getSlot } from '../../_util/props-util';
import BaseMixin from '../../_util/BaseMixin';
import { getTransitionProps, Transition } from '../../_util/transition';

function noop() {}
const ICON_OPEN = 'open';
const ICON_CLOSE = 'close';

const defaultTitle = '---';

const TreeNode = defineComponent({
  name: 'TreeNode',
  mixins: [BaseMixin],
  inheritAttrs: false,
  __ANT_TREE_NODE: true,
  props: initDefaultProps(
    {
      eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Pass by parent `cloneElement`
      prefixCls: PropTypes.string,
      // className: PropTypes.string,
      root: PropTypes.object,
      // onSelect: PropTypes.func,

      // By parent
      expanded: PropTypes.looseBool,
      selected: PropTypes.looseBool,
      checked: PropTypes.looseBool,
      loaded: PropTypes.looseBool,
      loading: PropTypes.looseBool,
      halfChecked: PropTypes.looseBool,
      title: PropTypes.any,
      pos: PropTypes.string,
      dragOver: PropTypes.looseBool,
      dragOverGapTop: PropTypes.looseBool,
      dragOverGapBottom: PropTypes.looseBool,

      // By user
      isLeaf: PropTypes.looseBool,
      checkable: PropTypes.looseBool,
      selectable: PropTypes.looseBool,
      disabled: PropTypes.looseBool,
      disableCheckbox: PropTypes.looseBool,
      icon: PropTypes.any,
      dataRef: PropTypes.object,
      switcherIcon: PropTypes.any,
      label: PropTypes.any,
      value: PropTypes.any,
    },
    {},
  ),
  setup() {
    return {
      vcTree: inject('vcTree', {}),
      vcTreeNode: inject('vcTreeNode', {}),
    };
  },

  data() {
    this.children = null;
    return {
      dragNodeHighlight: false,
    };
  },
  created() {
    provide('vcTreeNode', this);
  },
  // Isomorphic needn't load data in server side
  mounted() {
    const {
      eventKey,
      vcTree: { registerTreeNode },
    } = this;
    this.syncLoadData(this.$props);
    registerTreeNode && registerTreeNode(eventKey, this);
  },
  updated() {
    this.syncLoadData(this.$props);
  },
  beforeUnmount() {
    const {
      eventKey,
      vcTree: { registerTreeNode },
    } = this;
    registerTreeNode && registerTreeNode(eventKey, null);
  },

  methods: {
    onSelectorClick(e) {
      // Click trigger before select/check operation
      const {
        vcTree: { onNodeClick },
      } = this;
      onNodeClick(e, this);
      if (this.isSelectable()) {
        this.onSelect(e);
      } else {
        this.onCheck(e);
      }
    },

    onSelectorDoubleClick(e) {
      const {
        vcTree: { onNodeDoubleClick },
      } = this;
      onNodeDoubleClick(e, this);
    },

    onSelect(e) {
      if (this.isDisabled()) {
        return;
      }

      const {
        vcTree: { onNodeSelect },
      } = this;
      e.preventDefault();
      onNodeSelect(e, this);
    },

    onCheck(e) {
      if (this.isDisabled()) {
        return;
      }

      const { disableCheckbox, checked } = this;
      const {
        vcTree: { onNodeCheck },
      } = this;

      if (!this.isCheckable() || disableCheckbox) {
        return;
      }

      e.preventDefault();
      const targetChecked = !checked;
      onNodeCheck(e, this, targetChecked);
    },

    onMouseEnter(e) {
      const {
        vcTree: { onNodeMouseEnter },
      } = this;
      onNodeMouseEnter(e, this);
    },

    onMouseLeave(e) {
      const {
        vcTree: { onNodeMouseLeave },
      } = this;
      onNodeMouseLeave(e, this);
    },

    onContextMenu(e) {
      const {
        vcTree: { onNodeContextMenu },
      } = this;
      onNodeContextMenu(e, this);
    },

    onDragStart(e) {
      const {
        vcTree: { onNodeDragStart },
      } = this;

      e.stopPropagation();
      this.setState({
        dragNodeHighlight: true,
      });
      onNodeDragStart(e, this);

      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {
        // empty
      }
    },

    onDragEnter(e) {
      const {
        vcTree: { onNodeDragEnter },
      } = this;

      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, this);
    },

    onDragOver(e) {
      const {
        vcTree: { onNodeDragOver },
      } = this;

      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, this);
    },

    onDragLeave(e) {
      const {
        vcTree: { onNodeDragLeave },
      } = this;

      e.stopPropagation();
      onNodeDragLeave(e, this);
    },

    onDragEnd(e) {
      const {
        vcTree: { onNodeDragEnd },
      } = this;

      e.stopPropagation();
      this.setState({
        dragNodeHighlight: false,
      });
      onNodeDragEnd(e, this);
    },

    onDrop(e) {
      const {
        vcTree: { onNodeDrop },
      } = this;

      e.preventDefault();
      e.stopPropagation();
      this.setState({
        dragNodeHighlight: false,
      });
      onNodeDrop(e, this);
    },

    // Disabled item still can be switch
    onExpand(e) {
      const {
        vcTree: { onNodeExpand },
      } = this;
      onNodeExpand(e, this);
    },
    // Drag usage
    setSelectHandle(node) {
      this.selectHandle = node;
    },

    getNodeChildren() {
      const originList = this.children;
      const targetList = getNodeChildren(originList);

      if (originList.length !== targetList.length) {
        warnOnlyTreeNode();
      }

      return targetList;
    },

    getNodeState() {
      const { expanded } = this;

      if (this.isLeaf2()) {
        return null;
      }

      return expanded ? ICON_OPEN : ICON_CLOSE;
    },

    isLeaf2() {
      const { isLeaf, loaded } = this;
      const {
        vcTree: { loadData },
      } = this;

      const hasChildren = this.getNodeChildren().length !== 0;
      if (isLeaf === false) {
        return false;
      }
      return isLeaf || (!loadData && !hasChildren) || (loadData && loaded && !hasChildren);
    },

    isDisabled() {
      const { disabled } = this;
      const {
        vcTree: { disabled: treeDisabled },
      } = this;

      // Follow the logic of Selectable
      if (disabled === false) {
        return false;
      }

      return !!(treeDisabled || disabled);
    },

    isCheckable() {
      const { checkable } = this.$props;
      const {
        vcTree: { checkable: treeCheckable },
      } = this;

      // Return false if tree or treeNode is not checkable
      if (!treeCheckable || checkable === false) {
        return false;
      }
      return treeCheckable;
    },

    // Load data to avoid default expanded tree without data
    syncLoadData(props) {
      const { expanded, loading, loaded } = props;
      const {
        vcTree: { loadData, onNodeLoad },
      } = this;
      if (loading) {
        return;
      }
      // read from state to avoid loadData at same time
      if (loadData && expanded && !this.isLeaf2()) {
        // We needn't reload data when has children in sync logic
        // It's only needed in node expanded
        const hasChildren = this.getNodeChildren().length !== 0;
        if (!hasChildren && !loaded) {
          onNodeLoad(this);
        }
      }
    },

    isSelectable() {
      const { selectable } = this;
      const {
        vcTree: { selectable: treeSelectable },
      } = this;

      // Ignore when selectable is undefined or null
      if (typeof selectable === 'boolean') {
        return selectable;
      }

      return treeSelectable;
    },

    // Switcher
    renderSwitcher() {
      const { expanded } = this;
      const {
        vcTree: { prefixCls },
      } = this;
      const switcherIcon =
        getComponent(this, 'switcherIcon', {}, false) ||
        getComponent(this.vcTree, 'switcherIcon', {}, false);
      if (this.isLeaf2()) {
        return (
          <span
            key="switcher"
            class={classNames(`${prefixCls}-switcher`, `${prefixCls}-switcher-noop`)}
          >
            {typeof switcherIcon === 'function'
              ? switcherIcon({ ...this.$props, ...this.$props.dataRef, isLeaf: true })
              : switcherIcon}
          </span>
        );
      }

      const switcherCls = classNames(
        `${prefixCls}-switcher`,
        `${prefixCls}-switcher_${expanded ? ICON_OPEN : ICON_CLOSE}`,
      );
      return (
        <span key="switcher" onClick={this.onExpand} class={switcherCls}>
          {typeof switcherIcon === 'function'
            ? switcherIcon({ ...this.$props, ...this.$props.dataRef, isLeaf: false })
            : switcherIcon}
        </span>
      );
    },

    // Checkbox
    renderCheckbox() {
      const { checked, halfChecked, disableCheckbox } = this;
      const {
        vcTree: { prefixCls },
      } = this;
      const disabled = this.isDisabled();
      const checkable = this.isCheckable();

      if (!checkable) {
        return null;
      }

      // [Legacy] Custom element should be separate with `checkable` in future
      const $custom = typeof checkable !== 'boolean' ? checkable : null;

      return (
        <span
          key="checkbox"
          class={classNames(
            `${prefixCls}-checkbox`,
            checked && `${prefixCls}-checkbox-checked`,
            !checked && halfChecked && `${prefixCls}-checkbox-indeterminate`,
            (disabled || disableCheckbox) && `${prefixCls}-checkbox-disabled`,
          )}
          onClick={this.onCheck}
        >
          {$custom}
        </span>
      );
    },

    renderIcon() {
      const { loading } = this;
      const {
        vcTree: { prefixCls },
      } = this;

      return (
        <span
          key="icon"
          class={classNames(
            `${prefixCls}-iconEle`,
            `${prefixCls}-icon__${this.getNodeState() || 'docu'}`,
            loading && `${prefixCls}-icon_loading`,
          )}
        />
      );
    },

    // Icon + Title
    renderSelector() {
      const { selected, loading, dragNodeHighlight } = this;
      const icon = getComponent(this, 'icon', {}, false);
      const {
        vcTree: { prefixCls, showIcon, icon: treeIcon, draggable, loadData },
      } = this;
      const disabled = this.isDisabled();
      const title = getComponent(this, 'title', {}, false);
      const wrapClass = `${prefixCls}-node-content-wrapper`;

      // Icon - Still show loading icon when loading without showIcon
      let $icon;

      if (showIcon) {
        const currentIcon = icon || treeIcon;
        $icon = currentIcon ? (
          <span class={classNames(`${prefixCls}-iconEle`, `${prefixCls}-icon__customize`)}>
            {typeof currentIcon === 'function'
              ? currentIcon({ ...this.$props, ...this.$props.dataRef })
              : currentIcon}
          </span>
        ) : (
          this.renderIcon()
        );
      } else if (loadData && loading) {
        $icon = this.renderIcon();
      }

      const currentTitle = title;
      const $title = currentTitle ? (
        <span class={`${prefixCls}-title`}>
          {typeof currentTitle === 'function'
            ? currentTitle({ ...this.$props, ...this.$props.dataRef })
            : currentTitle}
        </span>
      ) : (
        <span class={`${prefixCls}-title`}>{defaultTitle}</span>
      );
      return (
        <span
          key="selector"
          ref={this.setSelectHandle}
          title={typeof title === 'string' ? title : ''}
          class={classNames(
            `${wrapClass}`,
            `${wrapClass}-${this.getNodeState() || 'normal'}`,
            !disabled && (selected || dragNodeHighlight) && `${prefixCls}-node-selected`,
            !disabled && draggable && 'draggable',
          )}
          draggable={(!disabled && draggable) || undefined}
          aria-grabbed={(!disabled && draggable) || undefined}
          onMouseenter={this.onMouseEnter}
          onMouseleave={this.onMouseLeave}
          onContextmenu={this.onContextMenu}
          onClick={this.onSelectorClick}
          onDblclick={this.onSelectorDoubleClick}
          onDragstart={draggable ? this.onDragStart : noop}
        >
          {$icon}
          {$title}
        </span>
      );
    },

    // Children list wrapped with `Animation`
    renderChildren() {
      const { expanded, pos } = this;
      const {
        vcTree: { prefixCls, openTransitionName, openAnimation, renderTreeNode },
      } = this;

      let animProps = {};
      if (openTransitionName) {
        animProps = getTransitionProps(openTransitionName);
      } else if (typeof openAnimation === 'object') {
        animProps = { ...openAnimation, css: false, ...animProps };
      }

      // Children TreeNode
      const nodeList = this.getNodeChildren();

      if (nodeList.length === 0) {
        return null;
      }

      let $children;
      if (expanded) {
        $children = (
          <ul
            class={classNames(
              `${prefixCls}-child-tree`,
              expanded && `${prefixCls}-child-tree-open`,
            )}
            data-expanded={expanded}
            role="group"
          >
            {mapChildren(nodeList, (node, index) => renderTreeNode(node, index, pos))}
          </ul>
        );
      }

      return <Transition {...animProps}>{$children}</Transition>;
    },
  },

  render() {
    this.children = getSlot(this);
    const {
      dragOver,
      dragOverGapTop,
      dragOverGapBottom,
      isLeaf,
      expanded,
      selected,
      checked,
      halfChecked,
      loading,
    } = this.$props;
    const {
      vcTree: { prefixCls, filterTreeNode, draggable },
    } = this;
    const disabled = this.isDisabled();
    const dataOrAriaAttributeProps = getDataAndAria({ ...this.$props, ...this.$attrs });
    const { class: className, style } = this.$attrs;
    return (
      <li
        class={{
          [className]: className,
          [`${prefixCls}-treenode-disabled`]: disabled,
          [`${prefixCls}-treenode-switcher-${expanded ? 'open' : 'close'}`]: !isLeaf,
          [`${prefixCls}-treenode-checkbox-checked`]: checked,
          [`${prefixCls}-treenode-checkbox-indeterminate`]: halfChecked,
          [`${prefixCls}-treenode-selected`]: selected,
          [`${prefixCls}-treenode-loading`]: loading,
          'drag-over': !disabled && dragOver,
          'drag-over-gap-top': !disabled && dragOverGapTop,
          'drag-over-gap-bottom': !disabled && dragOverGapBottom,
          'filter-node': filterTreeNode && filterTreeNode(this),
        }}
        style={style}
        role="treeitem"
        onDragenter={draggable ? this.onDragEnter : noop}
        onDragover={draggable ? this.onDragOver : noop}
        onDragleave={draggable ? this.onDragLeave : noop}
        onDrop={draggable ? this.onDrop : noop}
        onDragend={draggable ? this.onDragEnd : noop}
        {...dataOrAriaAttributeProps}
      >
        {this.renderSwitcher()}
        {this.renderCheckbox()}
        {this.renderSelector()}
        {this.renderChildren()}
      </li>
    );
  },
});

TreeNode.isTreeNode = 1;

export default TreeNode;
