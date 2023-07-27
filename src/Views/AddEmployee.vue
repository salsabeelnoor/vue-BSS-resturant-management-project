<template>
  <section class="login-section">
    <div class="form-container">
      <v-card
        class="mx-auto pa-12 pb-8 form-card"
        elevation="8"
        max-width="500"
        rounded="lg"
      >
        <v-form @submit.prevent="addEmployee">
          <div class="d-flex text-subtitle-1 text-medium-emphasis mb-2">
            <p class="d-block form-label">Employee Name</p>
          </div>
          <v-text-field
            v-model="employeeInfo.name"
            density="compact"
            placeholder=""
            variant="outlined"
          ></v-text-field>
          <div class="d-flex text-subtitle-1 text-medium-emphasis mb-2">
            <p class="d-block form-label">Employee Designation</p>
          </div>
          <v-text-field
            v-model="employeeInfo.designation"
            density="compact"
            placeholder=""
            variant="outlined"
          ></v-text-field>
          <div class="d-flex text-subtitle-1 text-medium-emphasis mb-2">
            <p class="d-block form-label">Email</p>
          </div>
          <v-text-field
            v-model="employeeInfo.email"
            density="compact"
            variant="outlined"
          >
          </v-text-field>
          <div class="d-flex text-subtitle-1 text-medium-emphasis mb-2">
            <p class="d-block form-label">Amount Sold</p>
          </div>
          <v-text-field
            v-model="employeeInfo.amountSold"
            density="compact"
            variant="outlined"
            type="number"
          >
          </v-text-field>
          <div class="d-flex text-subtitle-1 text-medium-emphasis mb-2">
            <p class="d-block form-label">Joining Date</p>
          </div>
          <v-text-field
            v-model="employeeInfo.joiningDate"
            density="compact"
            variant="outlined"
            type="datetime-local"
          >
          </v-text-field>
          <v-btn class="submit-btn text-white" type="submit">Add</v-btn>
        </v-form>
      </v-card>
    </div>
  </section>
</template>
<script>
export default {
  name: "AddEmployee",
  data() {
    return {
      employeeInfo: {
        name: "",
        designation: "",
        joiningDate: "",
        email: "",
        amountSold: "",
      },
    };
  },
  methods: {
    addEmployee() {
      console.log(this.employeeInfo);
    },
  },
};
</script>
<style scoped>
.login-section {
  min-height: 100vh;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  background-color: #cad2db;
}
.form-container {
  min-height: auto;
}

.form-card {
  background-color: rgb(206, 215, 225);
}
.svg-icon {
  width: 1.5rem;
}
.form-label {
  margin-bottom: -5px;
}
.submit-btn {
  display: flex;
  justify-self: center;
  width: 100%;
  background-color: #00468c;
}
</style>