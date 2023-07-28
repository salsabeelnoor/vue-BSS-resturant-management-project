<template>
  <v-app-bar prominent class="top-nav">
    <v-container class="d-flex">
      <v-toolbar-title class="text-white"> BSS Restaurant </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="login-btn">Log in </v-btn>
    </v-container>
  </v-app-bar>
</template>
    <script>
export default {
  name: "TopNav",
  data: () => ({}),
};
</script>
<style scoped>
.top-nav {
  background-color: #143d6b;
}
.login-btn {
  color: rgb(26, 21, 13);
  background-color: #849db6;
}
</style>