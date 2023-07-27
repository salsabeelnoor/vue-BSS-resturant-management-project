<template>
  <top-nav></top-nav>
</template>
<script>
import TopNav from "../components/layout/default/TopNav.vue";
export default {
  name: "DashBoard",
  components: {
    TopNav,
  },
};
</script>
<style scoped>
.dashboard-drawer {
  background-color: rgb(212, 212, 212);
}
</style>