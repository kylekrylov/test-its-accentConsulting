<script>
const defaultLayout = 'DefaultLayout';

export default {
  name: 'App',
  
  computed: {
    layout() {
      const layoutName = this.$route.meta.layout || defaultLayout;
      return () => import(`./layouts/${layoutName}.vue`);
    },
  }
}
</script>

<template>
  <component :is="layout">
    <slot />
  </component>
</template>
