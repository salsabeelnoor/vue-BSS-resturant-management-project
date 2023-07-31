<template>
  <v-layout>
    <top-nav></top-nav>

    <v-navigation-drawer
      expand-on-hover
      rail
      class="dashboard-drawer dashboard-container"
    >
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
          prepend-icon="mdi-account-multiple"
          @click="$router.push('/admin')"
          title="Employee List"
          value="employeeList"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-table-large"
          @click="$router.push('/admin/employee-table')"
          title="Employee Table"
          value="employeeShared"
        ></v-list-item>
        <v-list-item
          @click="$router.push('/login')"
          prepend-icon="mdi-star"
          :title="toggleBtnText"
          value="starred"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
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
      btnText: "Log In",
    };
  },
  methods: {
    ...mapActions(["logOut"]),
  },
  computed: {
    ...mapGetters(["user"]),
    toggleBtnText() {
      if (this.user) {
        return (this.btnText = "Log Out");
      } else {
        return (this.btnText = "Log In");
      }
    },
  },
};
</script>
<style scoped>
.dashboard-container {
  background-color: #e5c877ce;
}
</style>