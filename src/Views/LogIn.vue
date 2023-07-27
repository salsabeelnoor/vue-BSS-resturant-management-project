<template>
  <section class="login-section">
    <div class="form-container">
      <h2 class="Log-in-header text-white rounded-t-xl">Log In</h2>
      <v-card
        class="mx-auto pa-12 pb-8 form-card"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <v-form @submit.prevent="submit">
          <div class="d-flex text-subtitle-1 text-medium-emphasis mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="svg-icon mr-2"
            >
              <path
                d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
              />
            </svg>

            <p class="d-block form-label">User Name</p>
          </div>
          <v-text-field
            v-model="userInfo.userName"
            density="compact"
            placeholder="Enter your Name"
            variant="outlined"
          ></v-text-field>
          <div class="d-flex text-subtitle-1 text-medium-emphasis mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="svg-icon mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clip-rule="evenodd"
              />
            </svg>

            <p class="d-block form-label">Password</p>
          </div>
          <v-text-field
            v-model="userInfo.password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <v-btn class="submit-btn text-white" type="submit">Log In</v-btn>
        </v-form>
      </v-card>
    </div>
  </section>
  <!-- <v-container class="login-container rounded-lg">
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
  </v-container> -->
</template>
<script>
import apiCall from "../api/apiInterface";
import { mapActions } from "vuex";
export default {
  name: "LogIn",
  components: {},
  data: () => ({
    userInfo: {
      userName: "",
      password: "",
    },
    visible: false,
    rules: [
      (value) => {
        if (value) return true;

        return "You must enter a first name.";
      },
    ],
  }),
  methods: {
    ...mapActions(["addUserInfo"]),
    submit() {
      apiCall.post("api/Auth/SignIn", this.userInfo).then((res) => {
        if (res.data) {
          console.log("login", res.data);
          this.addUserInfo(res.data);
          this.$router.push({ name: "dashboard" });
        }
      });
      // this.$store.dispatch("");
    },
  },
};
</script>
<style scoped>
.login-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cad2db;
}
.form-container {
  min-width: max(400px, 200px);
  min-height: auto;
}

.Log-in-header {
  display: flex;
  justify-content: center;
  padding: 20px;
  /* border: 2px solid red; */
  background: rgb(40, 130, 233);
}
.form-card {
  margin-top: -5px;
  background-color: rgb(206, 215, 225);
}
.svg-icon {
  width: 1.5rem;
}
.form-label {
  margin-bottom: -5px;
}

/* .form-card {
  border: 5px solid rgba(74, 47, 126, 0.702);
  padding: 10px;
  background: transparent;
  max-width: 500px;
  border-radius: 3%;
}
.form-header {
  min-height: 50px;
  background-color: rgba(67, 91, 212, 0.702);
} */
.submit-btn {
  display: flex;
  justify-self: center;
  width: 100%;
  background-color: #00468c;
}
</style>