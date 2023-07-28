<template>
  <section class="login-section">
    <div class="form-container">
      <v-container>
        <v-card class="mx-auto pa-12 pb-8 form-card">
          <v-form @submit.prevent="addEmployee" ref="form">
            <v-row>
              <v-col cols="12" md="8" sm="12" xs="12">
                <v-row class="form-first-row">
                  <v-col cols="12" md="6" sm="12" xs="12">
                    <v-text-field
                      v-model="employeeInfo.firstName"
                      density="compact"
                      placeholder=""
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
                      label="Email"
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
                      v-model="employeeInfo.joiningDate"
                      density="compact"
                      variant="outlined"
                      type="datetime-local"
                      hide-details="auto"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-img
                  class="bg-white ml-4"
                  height="220"
                  width="300"
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
                  v-model="employeeInfo.spouseName"
                  density="compact"
                  variant="outlined"
                  type="text"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12">
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
            </v-row>
            <v-row>
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-text-field
                  hide-details="auto"
                  label="Employee Designation"
                  v-model="employeeInfo.designation"
                  density="compact"
                  placeholder=""
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12">
                <v-select
                  hide-details="auto"
                  label="Gender Id"
                  class="company-size-dropdown"
                  :items="gender"
                  v-model="employeeInfo.genderId"
                  density="compact"
                  variant="outlined"
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12">
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
      gender: [0, 1, 2],
      employeeInfo: {
        firstName: "",
        middleName: "",
        lastName: "",
        designation: "",
        joiningDate: "",
        email: "",
        phoneNumber: "",
        fatherName: "",
        motherName: "",
        spouseName: "",
        dob: "",
        nid: "",
        genderId: 0, //1
        image: "",
        base64: "",
      },
    };
  },
  methods: {
    renderImage() {
      return new URL("../assets/image/employeeImg.jpg", import.meta.url).href;
    },
    onClickImage() {
      document.getElementById("image").click();
    },
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.employeeInfo.image = selectedImage.name;
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("base 64 working", e.target.result);
        this.employeeInfo.base64 = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    async addEmployee() {
      try {
        console.log("start");
        const response = await apiCall.post(
          "api/Employee/create",
          this.employeeInfo
        );
      } catch (e) {
        console.log(e);
      }

      // console.log(response);
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
.login-section {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cad2db;
}
.form-container {
  /* margin-top: 20px; */
  min-height: auto;
}

.form-card {
  background-color: rgb(226, 230, 232);
  /* max-width: 1000px; */
}

.submit-btn {
  width: 100%;
  background-color: #04386b;
}
</style>