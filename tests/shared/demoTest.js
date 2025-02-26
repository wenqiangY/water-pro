import glob from 'glob';
import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';
import moment from 'moment';
import water from '@fe6/water-pro';
import { sleep } from '../utils';

export default function demoTest(component, options = {}) {
  const suffix = options.suffix || 'vue';
  const files = glob.sync(`./v2-doc/src/docs/${component}/demo/*.${suffix}`);

  files.forEach(file => {
    let testMethod = options.skip === true ? test.skip : test;
    if (Array.isArray(options.skip) && options.skip.some(c => file.includes(c))) {
      testMethod = test.skip;
    }
    testMethod(`renders ${file} correctly`, async () => {
      MockDate.set(moment('2016-11-22'));
      const demo = require(`../.${file}`).default || require(`../.${file}`);
      document.body.innerHTML = '';
      const wrapper = mount(demo, { global: { plugins: [water] }, attachTo: document.body });
      await sleep(100);
      // should get dom from element
      // snap files copy from water does not need to change
      // or just change a little
      const dom = options.getDomFromElement ? wrapper.element : wrapper.html();
      expect(dom).toMatchSnapshot();
      MockDate.reset();
      // wrapper.unmount();
      document.body.innerHTML = '';
    });
  });
}
