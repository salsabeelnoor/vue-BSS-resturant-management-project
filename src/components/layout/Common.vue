<template>
  <top-nav></top-nav>
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
    TopNav