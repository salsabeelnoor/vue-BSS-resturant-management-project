<template>
  <v-layout>
    <top-nav></top-nav>
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TopNav from "./TopNav.vue";
export default {
  components: { TopNav },
  name: "Common",
  methods: {
    ...mapActions(["logOut"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>