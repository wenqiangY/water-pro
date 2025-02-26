import { App, Plugin } from 'vue';
import Upload from './Upload';
import Dragger from './Dragger';

export { UploadProps, UploadListProps, UploadChangeParam } from './interface';

Upload.Dragger = Dragger;

export { Upload, Dragger };

/* istanbul ignore next */
Upload.install = function(app: App) {
  app.component(Upload.name, Upload);
  app.component(Dragger.name, Dragger);
  return app;
};

export default Upload as typeof Upload &
  Plugin & {
    readonly Dragger: typeof Dragger;
  };
