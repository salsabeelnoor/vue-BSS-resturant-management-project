<template>
  <section class="login-section">
    <div class="form-container">
      <v-container>
        <h2 class="text-center pb-10 employee-add-header">Add New Employee</h2>

        <v-card class="mx-auto pa-12 pb-8 form-card" elevation="8" rounded="lg">
          <v-form @submit.prevent="addEmployee" ref="form">
            <v-row>
              <v-col cols="12" md="8" sm="12" xs="12">
                <v-row class="form-first-row">
                  <v-col cols="12" md="6" sm="12" xs="12">
                    <v-text-field
                      class="mb-3"
                      v-model="employeeInfo.firstName"
                      density="compact"
                      variant="outlined"
                      label="First Name"
                      hide-details="auto"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6" sm="12" xs="12">
                    <v-text-field
                      label="Middle Name"
                      v-model="employeeInfo.middleName"
                      density="compact"
                      placeholder=""
                      variant="outlined"
                      hide-details="auto"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6" sm="12" xs="12">
                    <v-text-field
                      label="Last Name"
                      v-model="employeeInfo.lastName"
                      density="compact"
                      placeholder=""
                      variant="outlined"
                      hide-details="auto"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6" sm="12" xs="12">
                    <v-text-field
                      class="mb-3"
                      label="Email"
                      type="email"
                      v-model="employeeInfo.email"
                      density="compact"
                      placeholder=""
                      variant="outlined"
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="12" xs="12">
                    <v-text-field
                      hide-details="auto"
                      label="Phone Number"
                      v-model="employeeInfo.phoneNumber"
                      density="compact"
                      variant="outlined"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="12" xs="12">
                    <v-text-field
                      label="Joining Date"
                      v-model="employeeInfo.joinDate"
                      density="compact"
                      variant="outlined"
                      type="datetime-local"
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12" class="img-section">
                <v-img
                  class="bg-white ma-0"
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
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                  label="Father Name"
                  v-model="employeeInfo.fatherName"
                  density="compact"
                  variant="outlined"
                  type="text"
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                  label="Mother Name"
                  hide-details="auto"
                  v-model="employeeInfo.motherName"
                  density="compact"
                  variant="outlined"
                  type="text"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                  label="Spouse Name"
                  hide-details="auto"
                  v-model="employeeInfo.spouseName"
                  density="compact"
                  variant="outlined"
                  type="text"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-text-field
                  label="Date of Birth"
                  v-model="employeeInfo.dob"
                  hide-details="auto"
                  density="compact"
                  variant="outlined"
                  placeholder="Date of Birth"
                  type="datetime-local"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-text-field
                  hide-details="auto"
                  label="Employee Designation"
                  v-model="employeeInfo.designation"
                  density="compact"
                  placeholder=""
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-select
                  v-model="selectedGender"
                  hide-details="auto"
                  label="Gender Id"
                  class="company-size-dropdown"
                  density="compact"
                  variant="outlined"
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
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-text-field
                  hide-details="auto"
                  label="NID"
                  v-model="employeeInfo.nid"
                  density="compact"
                  variant="outlined"
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
                  variant="outlined"
                  prepend-icon=""
                >
                </v-file-input>
              </v-col>
            </v-row>
            <v-container>
              <v-btn class="submit-btn text-white" type="submit"
                >Add Employee</v-btn
              >
            </v-container>
          </v-form>
        </v-card>
      </v-container>
    </div>
  </section>
</template>
<script>
import apiCall from "../api/apiInterface";

export default {
  name: "AddEmployee",
  data() {
    return {
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
    selectedGender: {
      deep: true,
      handler(value) {
        this.employeeInfo.genderId = value;
      },
    },
  },
  methods: {
    format(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
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
        console.log("base 64 working", e.target.result);
        this.employeeInfo.base64 = e.target.result;
      };
      console.log(this.employeeInfo.base64);
      reader.readAsDataURL(fileObject);
    },
    async addEmployee() {
      try {
        const response = await apiCall.post(
          "api/Employee/create",
          this.employeeInfo
        );
      } catch (e) {
        console.log(e);
      }
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.login-section {
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0eee7;
}
h2 {
  white-space: nowrap;
  overflow: hidden;
  font-size: 34px;
  animation: fadeInUp 1.5s forwards;
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate(0, 50px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

.form-card {
  background-color: #e9e0d2;
}
.img-section {
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 150px;
}
.img-section img {
  display: block;
}
.submit-btn {
  width: 100%;
  background-color: #c7712b;
}
</style>