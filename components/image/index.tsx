import { App, defineComponent, inject, Plugin } from 'vue';
import { defaultConfigProvider } from '../config-provider';
import ImageInternal from '../vc-image';
export type { ImagePropsType } from '../vc-image/src/Image';
import { ImageProps } from '../vc-image/src/Image';

import PreviewGroup from './PreviewGroup';
const Image = defineComponent({
  name: 'AImage',
  inheritAttrs: false,
  props: ImageProps,
  setup(props, ctx) {
    const { slots, attrs } = ctx;
    // TODO [fix] 解决使用的过程中未用 configProvider 报错
    const configProvider = inject('configProvider', defaultConfigProvider) || defaultConfigProvider;
    return () => {
      const { getPrefixCls } = configProvider;
      const prefixCls = getPrefixCls('image', props.prefixCls);
      return <ImageInternal {...{ ...attrs, ...props, prefixCls }} v-slots={slots}></ImageInternal>;
    };
  },
});

export { ImageProps };

Image.PreviewGroup = PreviewGroup;

Image.install = function(app: App) {
  app.component(Image.name, Image);
  app.component(Image.PreviewGroup.name, Image.PreviewGroup);
  return app;
};

export default Image as typeof Image &
  Plugin & {
    readonly PreviewGroup: typeof PreviewGroup;
  };
