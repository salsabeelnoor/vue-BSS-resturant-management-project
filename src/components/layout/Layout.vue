<template>
  <top-nav></top-nav>
  <slot></slot>
</template>
<script>
import TopNav from "../default/TopNav.vue";
export default {
  name: "Layout",
  components: {
    TopNav,
  },
};
</script>