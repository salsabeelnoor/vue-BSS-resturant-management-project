<template>
  <v-layout>
    <v-navigation-drawer expand-on-hover rail class="dashboard-drawer">
      <v-list>
        <v-list-item
          :prepend-avatar="
            user.image
              ? imageUrl + 'user/' + user.image
              : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
          "
          :title="user.fullName"
          :subtitle="user.userName"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          title="Employee List"
          value="employeeList"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Employee Table"
          value="employeeShared"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-star"
          title="Starred"
          value="starred"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <top-nav></top-nav>
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TopNav from "./TopNav.vue";
import { imageUrl } from "../../constants/config";
export default {
  name: "Admin",
  components: {
    TopNav,
  },
  data() {
    return {
      imageUrl: imageUrl,
    };
  },
  methods: {
    ...mapActions(["logOut"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>