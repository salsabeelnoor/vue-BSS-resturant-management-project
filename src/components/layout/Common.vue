<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail class="dashboard-drawer">
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
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
    </v-layout>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Common",
  methods: {
    ...mapActions(["logOut"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>