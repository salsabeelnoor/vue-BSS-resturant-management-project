<template>
  <section class="login-section">
    <v-container class="login-container">
      <div class="img-container">
        <img class="img" src="../assets/logo-images/login-pic.jpg" alt="" />
      </div>
      <v-card class="form-container mx-auto pa-9" elevation="12">
        <h2 class="text-center mb-8">Have an account?</h2>

        <div class="spinner-container">
          <Spinner v-if="showSpinner" class="spinner" />
        </div>
        <v-form @submit.prevent="submit">
          <div class="d-flex text-subtitle-1 text-medium-emphasis mb-3">
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

            <p class="d-block form-label">User Email</p>
          </div>
          <v-text-field
            class="mb-1"
            :rules="[rules.required, rules.email]"
            v-model="userInfo.userName"
            density="compact"
            placeholder="Enter your Email"
            variant="outlined"
          ></v-text-field>
          <div class="d-flex text-subtitle-1 text-medium-emphasis mb-3">
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
            class="mb-3"
            v-model="userInfo.password"
            :append-inner-icon="passwordIconVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="passwordIconVisible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            variant="outlined"
            @click:append-inner="passwordIconVisible = !passwordIconVisible"
          ></v-text-field>
          <div class="btn-container">
            <v-btn class="submit-btn text-white" type="submit">Submit</v-btn>
          </div>
          <p v-if="visible" class="text-red text-center mt-3">
            {{ failedMessage }}
          </p>
        </v-form>
      </v-card>
    </v-container>
  </section>
</template>
<script>
import Spinner from "../components/utils/Spinner.vue";
import apiCall from "../api/apiInterface";
import { mapActions, mapState } from "vuex";
export default {
  name: "LogIn",
  components: {
    Spinner,
  },
  data: () => ({
    showSpinner: false,
    userInfo: {
      userName: "",
      password: "",
    },
    failedMessage: "Invalid email or password",
    passwordIconVisible: false,
    visible: false,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  computed: {
    // ...mapState(["showSpinner", "hideSpinner"]),
  },

  methods: {
    ...mapActions(["addUserInfo"]),
    submit() {
      // this.$store.commit("showSpinner");
      this.showSpinner = true;
      apiCall
        .post("api/Auth/SignIn", this.userInfo)
        .then((res) => {
          if (res.data) {
            // this.$store.commit("hideSpinner");
            this.showSpinner = false;
            this.visible = false;
            this.addUserInfo(res.data);
            this.$router.push({ name: "admin" });
          } else {
            this.showSpinner = false;

            this.visible = true;
          }
        })
        .catch((e) => {
          this.showSpinner = false;
          this.visible = true;
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
  background-color: #ccc;
}
.login-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.img-container {
  width: 70%;
  animation: moveImg 5s infinite alternate;
}
@keyframes identifier {
  10% {
    margin-top: -20px;
  }
  100% {
    margin-bottom: -20px;
  }
}
.img {
  filter: drop-shadow(0 0 0.75rem rgb(73, 56, 59));
  width: 100%;
}
.form-container {
  position: absolute;
  width: clamp(500.5px, -11.875rem + 17.333332999999996vw, 200px);
  height: clamp(400px, -1.125rem + 15.333332999999996vw, 500px);
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
}
@media only screen and (min-width: 768px) and (max-width: 1500px) {
  .form-container {
    right: 50px;
  }
}
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.login-logo {
  /* background-color: #06d506; */
  border-radius: 50%;
  width: 80px;
}

.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.svg-icon {
  width: 1.5rem;
}
.form-label {
  margin-bottom: -5px;
}
.btn-container {
  position: relative;
  display: flex;
  justify-content: center;
}
.submit-btn {
  width: 70%;
  font-weight: 600;
  background-color: #ec462e;
}
</style>