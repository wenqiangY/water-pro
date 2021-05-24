import '@babel/polyfill';
// import 'ant-design-vue/style';
import '../components/style';
import { createApp, version } from 'vue';
import App from './App.vue';
import water from '../components/index';
// import water from 'ant-design-vue/index.ts';

// eslint-disable-next-line no-console
console.log('Vue version: ', version);
const basic = (_, { slots }) => {
  return slots && slots.default && slots.default();
};
const app = createApp(App);
app
  .component('demo-sort', basic)
  .component('md', basic)
  .component('api', basic)
  .component('CN', basic)
  .component('US', basic)
  .component('demo-container', basic)
  .use(water)
  .mount('#app');
