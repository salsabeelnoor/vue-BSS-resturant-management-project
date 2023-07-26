<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-toolbar-title>My files</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn>BTN</v-btn>
      </v-app-bar>

      <v-main> </v-main>
    </v-layout>
  </v-card>
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
</style>