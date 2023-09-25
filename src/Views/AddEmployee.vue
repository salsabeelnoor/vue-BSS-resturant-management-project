<template>
  <section class="login-section">
    <v-container>
      <v-card class="mx-auto pa-12 pb-8 form-card" elevation="0">
        <h1>&bull; Add New Employee &bull;</h1>
        <div class="underline mt-2 mb-10"></div>
        <div class="spinner-container">
          <Spinner v-if="showSpinner" class="spinner" />
        </div>
        <v-form @submit.prevent="addEmployee" ref="form">
          <v-row>
            <v-col cols="12" md="9" sm="12" xs="12">
              <v-row>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    class="text-field mb-5"
                    v-model="employeeInfo.firstName"
                    density="compact"
                    label="First Name"
                    hide-details="auto"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    class="text-field mb-5"
                    label="Middle Name"
                    v-model="employeeInfo.middleName"
                    density="compact"
                    placeholder=""
                    hide-details="auto"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    class="text-field mb-5"
                    label="Last Name"
                    v-model="employeeInfo.lastName"
                    density="compact"
                    placeholder=""
                    hide-details="auto"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    class="text-field mb-5"
                    label="Email"
                    type="email"
                    v-model="employeeInfo.email"
                    density="compact"
                    placeholder=""
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    class="text-field mb-4"
                    hide-details="auto"
                    label="Phone Number"
                    v-model="employeeInfo.phoneNumber"
                    density="compact"
                    type="number"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    class="text-field mb-4"
                    label="Joining Date"
                    v-model="employeeInfo.joinDate"
                    density="compact"
                    type="datetime-local"
                    hide-details="auto"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    class="text-field mb-4"
                    label="Father Name"
                    v-model="employeeInfo.fatherName"
                    density="compact"
                    type="text"
                    hide-details="auto"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    class="text-field mb-4"
                    label="Mother Name"
                    hide-details="auto"
                    v-model="employeeInfo.motherName"
                    density="compact"
                    type="text"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12" xs="12">
                  <v-text-field
                    class="text-field mb-4"
                    label="Spouse Name"
                    hide-details="auto"
                    v-model="employeeInfo.spouseName"
                    density="compact"
                    type="text"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="12"
              xs="12"
              class="img-section"
              :style="{
                'background-color': isbase64Available ? 'transparent' : '#ccc',
              }"
            >
              <v-img
                :class="[
                  {
                    pseudoClass: showPseudoContent,
                  },
                ]"
                @click="onClickImage"
                :aspect-ratio="1"
                :src="
                  employeeInfo.base64 != null
                    ? employeeInfo.base64
                    : renderImage()
                "
              ></v-img>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" sm="12" xs="12">
              <v-text-field
                class="text-field mb-4"
                label="Date of Birth"
                v-model="employeeInfo.dob"
                hide-details="auto"
                density="compact"
                placeholder="Date of Birth"
                type="datetime-local"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="12" xs="12">
              <v-text-field
                class="text-field mb-4"
                hide-details="auto"
                label="Employee Designation"
                v-model="employeeInfo.designation"
                density="compact"
                placeholder=""
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="12" xs="12">
              <v-select
                v-model="selectedGender"
                hide-details="auto"
                label="Gender Id"
                class="text-field mb-4 company-size-dropdown"
                density="compact"
                item-title="text"
                item-value="value"
                :items="genders"
              >
                <template v-slot:item="{ item, props }">
                  <v-list-item v-bind="props">
                    <template v-slot:title>
                      {{ item.raw.text }}
                    </template>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="3" sm="12" xs="12">
              <v-text-field
                class="text-field mb-4"
                hide-details="auto"
                label="NID"
                v-model="employeeInfo.nid"
                density="compact"
                type="number"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-file-input
                id="image"
                class="d-none"
                @change="handleImage"
                label="Select file"
                density="compact"
                prepend-icon=""
              >
              </v-file-input>
            </v-col>
          </v-row>
          <div class="submit-btn-container">
            <v-btn type="submit" class="submit-btn" elevation="0" size="large"
              >Submit</v-btn
            >
          </div>
        </v-form>
      </v-card>
    </v-container>
  </section>
</template>
<script>
import apiCall from "../api/apiInterface";
import Spinner from "../components/utils/Spinner.vue";
export default {
  name: "AddEmployee",
  components: {
    Spinner,
  },
  data() {
    return {
      showSpinner: false,
      isbase64Available: false,
      showPseudoContent: true,
      genders: [
        { text: "Male", value: 1 },
        { text: "Female", value: 2 },
        { text: "Other", value: 3 },
      ],
      employeeInfo: {
        firstName: "",
        middleName: "",
        lastName: "",
        designation: "",
        joinDate: "",
        email: "",
        phoneNumber: "",
        fatherName: "",
        motherName: "",
        spouseName: "",
        dob: "",
        nid: "",
        genderId: 1,
        image: "",
        base64: "",
      },
      selectedGender: {
        text: "Male",
        value: 1,
      },
    };
  },
  watch: {
    //Gender Id watch
    selectedGender: {
      deep: true,
      handler(value) {
        this.employeeInfo.genderId = value;
      },
    },
  },
  methods: {
    // format(date) {
    //   const day = date.getDate();
    //   const month = date.getMonth() + 1;
    //   const year = date.getFullYear();
    //   return `${day}/${month}/${year}`;
    // },
    renderImage() {
      return new URL("../assets/image/employeeImg.jpg", import.meta.url).href;
    },
    onClickImage() {
      document.getElementById("image").click();
    },
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.employeeInfo.image = selectedImage.name;
      // this.employeeInfo.image = URL.createObjectURL(selectedImage);
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.employeeInfo.base64 = e.target.result;
      };
      reader.readAsDataURL(fileObject); // here ends
      this.showPseudoContent = false; //
      this.isbase64Available = true; //
    },
    async addEmployee() {
      this.showSpinner = true;
      try {
        await apiCall.post("api/Employee/create", this.employeeInfo);
        this.showSpinner = false;
      } catch (e) {
        this.showSpinner = false;
        console.log(e);
      }
      this.isbase64Available = false;
      this.employeeInfo.base64 = "";
      this.showPseudoContent = true;
      this.$refs.form.reset();
    },
  },
};
</script>
<style>
.v-img__img--contain {
  object-fit: cover;
}
</style>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");

* {
  box-sizing: border-box;
}
.login-section {
  min-height: 90vh;
  background-image: url("../assets/logo-images/cart_bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
h1 {
  font-family: "Montserrat", Arial, sans-serif;
  white-space: wrap;
  color: #474544;
  overflow: hidden;
  font-size: clamp(0.73rem, -0.875rem + 8.333vw, 2rem);
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}
@media screen and (min-width: 768px) {
  h1 {
    letter-spacing: 5px;
  }
}
.underline {
  border-bottom: solid 2px #474544;
  margin: -0.512em auto;
  width: clamp(53px, 68px, 80px);
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
.form-card {
  background-color: transparent;
}
.text-field {
  font-family: "Noto Sans", sans-serif;
  background-color: white;
}
.img-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 100px;
}
.img-section img {
  width: 100%;
  object-fit: cover;
}

.pseudoClass::before {
  content: "Insert an  image";
  font-size: clamp(0.6rem, -0.875rem + 8.333vw, 0.95rem);
  color: #7e7e7e;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.submit-btn-container {
  display: flex;
  justify-content: center;
}
.submit-btn {
  text-transform: capitalize;
  background-color: #e6683c;
  border-radius: 0;
  color: white;
  letter-spacing: 0;
  width: 100px;
}

@media screen and (min-width: 768px) {
  .submit-btn-container {
    justify-content: flex-start;
  }
  .submit-btn {
    width: auto;
  }
}
</style>