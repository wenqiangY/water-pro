<template>
  <a-anchor :affix="false" :getCurrentAnchor="getCurrentAnchor">
    <a-anchor-link href="#components-anchor-demo-basic" title="Basic demo" />
    <a-anchor-link href="#components-anchor-demo-static" title="Static demo" />
    <a-anchor-link href="#API" title="API">
      <a-anchor-link href="#Anchor-Props" title="Anchor Props" />
      <a-anchor-link href="#Link-Props" title="Link Props" />
    </a-anchor-link>
  </a-anchor>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const getCurrentAnchor = () => {
      return '#components-anchor-demo-static';
    };
    return {
      getCurrentAnchor,
    };
  },
});
</script>
