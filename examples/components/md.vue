<template>
  <div class="markdown" v-html="marked(text)" />
</template>
<script>
import marked from 'marked';
import { isZhCN } from '../utils/util';
const renderer = new marked.Renderer();
renderer.heading = function(text, level) {
  return (
    '<h' + level + ' id="' + text.replace(/[^\w]+/g, '-') + '">' + text + '</h' + level + '>\n'
  );
};
marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
});
export default {
  name: 'Md',
  props: {
    cn: String,
    us: String,
  },
  inject: {
    demoContext: { default: {} },
  },
  data() {
    let text = '';
    const { cn, us } = this;
    if (typeof this.$slots.default === 'function') {
      text = this.$slots.default();
    } else {
      text = isZhCN(this.demoContext.name) ? cn : us;
    }
    text = text || '';
    text = text
      .split('\n')
      .map(t => t.trim())
      .join('\n');

    return {
      marked,
      text,
    };
  },
};
</script>
