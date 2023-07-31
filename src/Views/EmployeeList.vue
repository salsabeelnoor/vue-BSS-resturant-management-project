<template>
  <section class="list-view-container">
    <v-container>
      <v-row>
        <v-col>Employee List</v-col>

        <v-col class="d-flex justify-end"
          ><v-btn
            class="create-btn"
            @click="$router.push('/admin/add-employee')"
            >Create New</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
    <div class="table-container">
      <Spinner v-if="showSpinner" class="spinner" />
      <v-data-table
        v-model:page="page"
        :headers="headers"
        :items="employees"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-5 table rounded-xl"
      >
        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
            <v-text-field
              :model-value="itemsPerPage"
              class="pa-2"
              label="Items per page"
              type="number"
              min="-1"
              max="15"
              hide-details
              @update:model-value="itemsPerPage = parseInt($event, 10)"
            ></v-text-field>
          </div>
        </template>
        <!-- <v-dialog v-if="dialogDelete" v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
        <template v-slot:item.action="{ item }">
          <v-btn
            @click="deleteEmployee(item.raw)"
            icon="mdi-delete"
            class="ma-1"
            elevation="0"
          >
          </v-btn>
        </template>
      </v-data-table>
    </div>

    <p class="ma-3 text-red text-center" v-if="errorMessage">
      {{ this.errorMessage }}
    </p>
  </section>
</template>
<script>
import apiCall from "../api/apiInterface";
import Spinner from "../components/utils/Spinner.vue";
export default {
  name: "EmployeeList",
  components: {
    Spinner,
  },
  data() {
    return {
      showSpinner: false,
      errorMessage: "",
      dialogDelete: false,
      page: 1,
      headers: [
        {
          align: "center",
          key: "name",
          sortable: false,
          title: "Employee Name",
        },
        { title: "Joining Date", key: "joiningDate" },
        { title: "Designation", key: "designation" },
        { title: "Action", key: "action", value: "action" },
      ],
      employees: [],
      itemsPerPage: 4,
      pageCount: 0,
      editedIndex: -1,
      defaultItem: {
        name: "",
        joiningDate: "",
        designation: "",
      },
    };
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.employees.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchEmployeeList() {
      try {
        const response = await apiCall.get("api/Employee/datatable");
        const rawData = response.data.data;
        this.employees = rawData.map((employee) => ({
          userid: employee.userId,
          name: employee.name,
          joiningDate: employee.joinDate,
          designation: employee.designation,
        }));
        console.log(this.employees);
        this.showSpinner = false;
      } catch (error) {
        this.showSpinner = false;
        console.error(error);
      }
    },
    async deleteEmployee(employeeId) {
      // this.editedIndex = this.employees.indexOf(employee);
      // this.editedItem = Object.assign({}, employee);
      // this.dialogDelete = true;
      this.showSpinner = true;
      console.log(employeeId.userid);
      try {
        const response = await apiCall.delete(
          `api/Employee/delete/${employeeId.userid}`
        );
        console.log(response.message);
        this.showSpinner = false;
      } catch (e) {
        this.showSpinner = false;
        this.errorMessage = e.message;
        console.log(e.message);
      }
    },
    deleteItemConfirm() {
      this.employees.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
  },
  mounted() {
    this.showSpinner = true;
    this.fetchEmployeeList();
  },
};
</script>
<style scoped>
.list-view-container {
  min-height: 100vh;
  background-color: #faf3dc;
}
.create-btn {
  color: rgb(26, 21, 13);
  background-color: #f99d52;
}
.table-container {
  width: 100%;
}
.spinner {
  top: 150px;
  left: 800px;
}
.table {
  width: 75%;
  margin: auto;
}
.table tbody {
  background-color: #917d3c !important;
}
</style>