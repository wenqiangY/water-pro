/** @format */

// collapse 展开折叠
import { defineComponent } from 'vue';
import { getSlot } from '../../_util/vue';
import ExpandTransition from './expand-transition-comp';

export default defineComponent({
  name: 'CollapseTransition',
  setup(_, { slots }) {
    return () => <ExpandTransition>{() => getSlot(slots)}</ExpandTransition>;
  },
});
