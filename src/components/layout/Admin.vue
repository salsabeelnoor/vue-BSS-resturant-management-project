<template>
  <v-layout>
    <v-navigation-drawer
      v-model="$store.state.toggleDashboard"
      class="dashboard-drawer dashboard-container"
    >
      <v-list class="logo-item">
        <v-list-item class="d-flex justify-center">
          <h2>BSS Eatery</h2>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list>
        <v-list-item
          :prepend-avatar="
            user.image
              ? imageUrl + 'user/' + user.image
              : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
          "
          :title="user.fullName"
          :subtitle="user.userName"
        >
        </v-list-item>
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
          prepend-icon="mdi-clipboard-account"
          @click="$router.push('/admin/employee-table')"
          title="Employee Table"
          value="employeeTable"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-table-large"
          @click="$router.push('/admin/add-table')"
          title="Add Table"
          value="table"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-star "
          @click="$router.push('/admin/add-food')"
          title="Add Food"
          value="table"
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
      drawer: true,
      rail: true,
      imageUrl: imageUrl,
      btnText: "Log In",
    };
  },
  computed: {
    ...mapGetters(["isDashboardToggled"]),
  },
  methods: {
    renderImage() {
      return new URL("../../assets/logo-images/bLogo_2.png", import.meta.url)
        .href;
    },
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
  background-color: #3e547c;
  color: white;
}
</style>