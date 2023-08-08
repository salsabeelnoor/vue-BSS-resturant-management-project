<template>
  <v-layout>
    <!-- :prepend-avatar="
            user.image
              ? imageUrl + 'user/' + user.image
              : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
          " -->
    <v-navigation-drawer
      v-model="$store.state.toggleDashboard"
      class="dashboard-drawer dashboard-container"
    >
      <v-list class="logo-item">
        <v-list-item class="d-flex justify-center">
          <h2 class="header">BSS Eatery</h2>
        </v-list-item>
        <v-divider class="divider"></v-divider>
      </v-list>
      <v-list class="profile-parent">
        <v-list-item
          class="profile-section"
          prepend-avatar="https://images.unsplash.com/photo-1593483316242-efb5420596ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwY2F0fGVufDB8fDB8fHww&w=1000&q=80"
          :title="user.fullName"
          :subtitle="user.userName"
        >
        </v-list-item>
      </v-list>

      <v-divider class="divider"></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          class="list-children"
          prepend-icon="mdi-account-multiple"
          @click="$router.push('/admin')"
          title="Employee List"
          value="employeeList"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-clipboard-account"
          @click="$router.push('/admin/table')"
          title="Table"
          value="Table"
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
  /* background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 65%,
    #cc2366 75%,
    #bc1888 100%
  ); */
  background-color: #fff;
  color: black;
  border-right: 1px solid #6b6767;
}
.header {
  letter-spacing: 2px;
}
hr {
  color: black;
  /* border: 1px solid black; */
}
.profile-parent {
  display: flex;
  justify-content: center;
}
.profile-section {
  display: flex;
}

.v-list-item--nav .v-list-item-title {
  border: 2px solid green;
  font-size: 16px !important;
  color: black;
}
</style>
<style>
.v-list-item--nav .v-list-item-title {
  border-radius: 0px;
  color: #59504c !important;
  font-size: 14px !important;
  opacity: 1;
  font-weight: 550;
}
.v-list-item__prepend > .v-icon {
  color: #59504c !important;
}
.v-list-item--variant-text .v-list-item__overlay {
  background: rgb(250, 88, 0);
  border-radius: 0;
}
hr[data-v-794909c8] {
  color: black;
  border: 0.5px solid #c73602;
  opacity: 0.2;
}
</style>