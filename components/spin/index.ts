import { App, Plugin } from 'vue';
import Spin, { setDefaultIndicator } from './Spin';

export { SpinProps } from './Spin';

Spin.setDefaultIndicator = setDefaultIndicator;

/* istanbul ignore next */
Spin.install = function(app: App) {
  app.component(Spin.name, Spin);
  return app;
};

export { Spin };

export default Spin as typeof Spin &
  Plugin & {
    readonly setDefaultIndicator: typeof setDefaultIndicator;
  };
