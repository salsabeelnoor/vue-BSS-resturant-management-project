<template>
  <h2>This is login</h2>
  <v-container class="login-container rounded-lg">
    <div class="form-card">
      <div class="form-header text-center">
        <h2>Please log in</h2>
      </div>
      <v-form @submit.prevent="submit">
        <div class="d-flex">
          <v-text-field
            v-model="userInfo.userName"
            :rules="rules"
            label="UserName"
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-text-field
            v-model="userInfo.password"
            type="password"
            :rules="rules"
            label="Password"
          ></v-text-field>
        </div>
        <v-btn class="submit-btn" type="submit" color="primary ">Submit</v-btn>
      </v-form>
    </div>
  </v-container>
</template>
<script>
import Layout from "../components/layout/Layout.vue";
import apiCall from "../api/apiInterface";
export default {
  name: "LogIn",
  components: {
    Layout,
  },
  data: () => ({
    userInfo: {
      userName: "",
      password: "",
    },
    rules: [
      (value) => {
        if (value) return true;

        return "You must enter a first name.";
      },
    ],
  }),
  methods: {
    submit() {
      apiCall.post("api/Auth/SignIn", this.userInfo).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>
<style scoped>
.login-container {
}
.form-card {
  border: 5px solid rgba(74, 47, 126, 0.702);
  padding: 10px;
  background: transparent;
  max-width: 500px;
  border-radius: 3%;
}
.form-header {
  min-height: 50px;
  background-color: rgba(67, 91, 212, 0.702);
}
.submit-btn {
  /* margin-left: 180px; */
  display: flex;
  justify-self: center;
  width: 100%;
}
</style>