<template>
  <v-app-bar color="#ccc" prominent>
    <v-spacer></v-spacer>
    <v-btn>BTN</v-btn>
  </v-app-bar>
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