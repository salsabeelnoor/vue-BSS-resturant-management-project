<template>
  <section class="login-section">
    <v-container class="login-container">
      <div class="img-container">
        <img class="img" src="../assets/bg-image/login_img.jpg" alt="" />
      </div>
      <v-card class="form-container" elevation="12">
        <div class="form-inner">
          <h2 class="text-center mb-8">Have an account?</h2>

          <div class="spinner-container">
            <Spinner v-if="showSpinner" class="spinner" />
          </div>
          <v-form @submit.prevent="submit" class="form">
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
              :append-inner-icon="
                passwordIconVisible ? 'mdi-eye-off' : 'mdi-eye'
              "
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
        </div>
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
* {
  font-size: clamp(12px, -0.875rem + 2.333vw, 16px);
}
h2 {
  font-size: clamp(16px, -0.875rem + 2.333vw, 25px);
}
.login-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 65%,
    #cc2366 75%,
    #bc1888 100%
  );
}
.login-container {
  width: 100% !important;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.img-container {
  width: 95%;
}
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  border-radius: 0;
  /* margin-top: -10px; */
  height: 390px;
}

@media screen and (min-width: 991px) {
  .login-container {
    flex-direction: row;
  }
  .img-container {
    width: 45%;
    margin: auto 30px;
  }
  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    border-radius: 0;
    margin-top: -10px;
    height: 525px;
  }
}

.img {
  filter: drop-shadow(0 0 0.75rem rgb(54, 38, 41));
  width: 100%;
}

.form-inner {
  width: 80% !important;
}
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.login-logo {
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
  background-color: #cc2366;
  color: white;
}
</style>