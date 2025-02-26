import { AnchorHTMLAttributes, FunctionalComponent } from 'vue';
import warning from '../_util/warning';
import Base, { baseProps, BlockProps } from './Base';
import Omit from 'omit.js';
import PropTypes from '../_util/vue-types';

export interface LinkProps extends BlockProps, Omit<AnchorHTMLAttributes, 'type'> {
  ellipsis?: boolean;
  size?: 'default' | 'small' | 'large';
}

const Link: FunctionalComponent<LinkProps> = (props, { slots, attrs }) => {
  const { ellipsis, rel, ...restProps } = { ...props, ...attrs };
  warning(
    typeof ellipsis !== 'object',
    'Typography.Link',
    '`ellipsis` only supports boolean value.',
  );
  const mergedProps = {
    ...restProps,
    rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel,
    ellipsis: !!ellipsis,
    component: 'a',
  };
  // https://github.com/ant-design/ant-design/issues/26622
  // @ts-ignore
  delete mergedProps.navigate;

  return <Base {...mergedProps} v-slots={slots}></Base>;
};

Link.displayName = 'ATypographyLink';
Link.inheritAttrs = false;
Link.props = Omit({ ...baseProps(), ellipsis: PropTypes.looseBool }, ['component']);

export default Link;
