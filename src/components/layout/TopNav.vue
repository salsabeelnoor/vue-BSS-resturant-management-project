<template>
  <v-layout>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

    <v-app-bar color="#6B7A8F" prominent class="top-nav">
      <v-container class="d-flex">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="mt-3 ml-3"
          >BSS Restaurant System</v-toolbar-title
        >

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi-filter"></v-btn>

        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list :items="items"></v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>
  <!-- <v-app-bar prominent class="top-nav">
    <v-container class="d-flex">
      <v-app-bar-nav-icon
        variant="text"
        class="nav-bar-icon"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="text-white nav-title">
        BSS Restaurant
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="login-btn" @click="$router.push('/login')">Log in </v-btn>
    </v-container>
  </v-app-bar> -->
</template>
    <script>
export default {
  name: "TopNav",
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: "Foo",
        value: "foo",
      },
      {
        title: "Bar",
        value: "bar",
      },
      {
        title: "Fizz",
        value: "fizz",
      },
      {
        title: "Buzz",
        value: "buzz",
      },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style scoped>
.top-nav {
  width: 80%;
  margin: 0 auto;
  background-color: #143d6b;
}
.nav-bar-icon {
  border: 2px solid red;
}
.nav-title {
  border: 2px solid red;
}
.login-btn {
  color: rgb(26, 21, 13);
  background-color: #849db6;
}
</style>