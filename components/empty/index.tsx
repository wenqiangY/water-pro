import { CSSProperties, VNodeTypes, inject, FunctionalComponent, h } from 'vue';
import classNames from '../_util/classNames';
import { defaultConfigProvider } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';
import { filterEmpty } from '../_util/props-util';
import PropTypes from '../_util/vue-types';
import { withInstall } from '../_util/type';

const defaultEmptyImg = h(DefaultEmptyImg);
const simpleEmptyImg = h(SimpleEmptyImg);

export interface TransferLocale {
  description?: string;
}

export interface EmptyProps {
  prefixCls?: string;
  class?: any;
  style?: string | CSSProperties;
  imageStyle?: CSSProperties;
  image?: VNodeTypes | null;
  description?: VNodeTypes;
}

interface EmptyType extends FunctionalComponent<EmptyProps> {
  displayName: string;
  PRESENTED_IMAGE_DEFAULT: VNodeTypes;
  PRESENTED_IMAGE_SIMPLE: VNodeTypes;
}

const Empty: EmptyType = (props, { slots = {}, attrs }) => {
  // TODO [fix] 解决使用的过程中未用 configProvider 报错
  const configProvider = inject('configProvider', defaultConfigProvider) || defaultConfigProvider;
  const { getPrefixCls, direction } = configProvider;
  const {
    prefixCls: customizePrefixCls,
    image = slots.image?.() || defaultEmptyImg,
    description = slots.description?.() || undefined,
    imageStyle,
    class: className = '',
    ...restProps
  } = { ...props, ...attrs };

  return (
    <LocaleReceiver
      componentName="Empty"
      children={(locale: TransferLocale) => {
        const prefixCls = getPrefixCls('empty', customizePrefixCls);
        const des = typeof description !== 'undefined' ? description : locale.description;
        const alt = typeof des === 'string' ? des : 'empty';
        let imageNode: EmptyProps['image'] = null;

        if (typeof image === 'string') {
          imageNode = <img alt={alt} src={image} />;
        } else {
          imageNode = image;
        }

        return (
          <div
            class={classNames(prefixCls, className, {
              [`${prefixCls}-normal`]: image === simpleEmptyImg || slots.image,
              [`${prefixCls}-rtl`]: direction === 'rtl',
            })}
            {...restProps}
          >
            <div class={`${prefixCls}-image`} style={imageStyle}>
              {imageNode}
            </div>
            {des && <p class={`${prefixCls}-description`}>{des}</p>}
            {slots.default && (
              <div class={`${prefixCls}-footer`}>{filterEmpty(slots.default())}</div>
            )}
          </div>
        );
      }}
    />
  );
};

Empty.displayName = 'AEmpty';

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
Empty.inheritAttrs = false;
Empty.props = {
  prefixCls: PropTypes.string,
  image: PropTypes.any,
  description: PropTypes.any,
  imageStyle: PropTypes.object,
};

export default withInstall(Empty);
