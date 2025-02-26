import { defineComponent } from 'vue';

import AButton from '../../../button/button';
import useConfigInject from '../../../_util/hooks/useConfigInject';
import { getSlot } from '../../../_util/props-util';

import { basicProps } from '../props';

export default defineComponent({
  name: 'BasicModalFooter',
  props: basicProps,
  emits: ['ok', 'cancel'],
  setup(props, { emit }) {
    const { prefixCls: prefixClsNew } = useConfigInject('modal-pro-footer', props);

    function handleOk() {
      emit('ok');
    }

    function handleCancel() {
      emit('cancel');
    }

    return { handleOk, handleCancel, prefixClsNew };
  },
  render() {
    let footerNode = null;

    let cancelBtnNode = null;
    if (this.showCancelBtn) {
      cancelBtnNode = (
        <AButton {...this.cancelButtonProps} onClick={this.handleCancel}>
          {this.cancelText}
        </AButton>
      );
    }

    let okBtnNode = null;
    if (this.showOkBtn) {
      okBtnNode = (
        <AButton type={this.okType} {...this.okButtonProps} onClick={this.handleOk}>
          {this.okText}
        </AButton>
      );
    }

    if (this.showCancelBtn || this.showOkBtn || this.$slots.insertFooter) {
      footerNode = (
        <div class={this.prefixClsNew}>
          {getSlot(this, 'insertFooter')}
          {cancelBtnNode}
          {getSlot(this, 'centerFooter')}
          {okBtnNode}
          {getSlot(this, 'appendFooter')}
        </div>
      );
    }

    return footerNode;
  },
});
