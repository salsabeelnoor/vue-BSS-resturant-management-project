<template>
  <v-responsive class="table-page-container">
    <v-container>
      <div class="header-container d-flex justify-space-between pt-5">
        <h2>Table Information</h2>
      </div>
    </v-container>
    <v-data-table-server
      v-model:page="page"
      :headers="headers"
      :items="tableInfo"
      :item-class="tableRowStyle"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="table"
      :items-length="totalItems"
      @update:options="fetchTableInfo"
    >
      <!-- <template v-slot:item.available="{ item }">
        <v-select :items="employees" label="Employee Name">
          <template v-slot:item="{ item, props }">
            <v-list-item v-bind="props">
              <template v-slot:title>
                {{ item.raw }}
              </template>
            </v-list-item>
          </template>
        </v-select>
      </template> -->
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <div class="modal-text d-flex">
                <h3>Table Number: {{ selectedTable.tableNumber }}</h3>
              </div>
              <div class="modal-text d-flex">
                <h3>Number of Seats: {{ selectedTable.numberOfSeats }}</h3>
              </div>
              <v-select :items="getEmployeeNames" label="Items"></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.available="{ item }">
        <div v-if="item.isOccupied">Not Available</div>
        <svg
          v-else
          class="is-available-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fill=""
            d="M11.707 6.707a1 1 0 0 0-1.414-1.414L7 8.586L5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"
          />
        </svg>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          class="text-capitalize action-btn"
          elevation="0"
          @click="selectTable(item.raw)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            class=""
            viewBox="0 0 32 32"
          >
            <path
              fill="#005c83"
              d="M14 4c-3.854 0-7 3.146-7 7c0 2.41 1.23 4.552 3.094 5.813C6.527 18.343 4 21.88 4 26h2c0-4.43 3.57-8 8-8c1.376 0 2.654.358 3.78.97A7.993 7.993 0 0 0 16 24c0 4.406 3.594 8 8 8c4.406 0 8-3.594 8-8c0-4.406-3.594-8-8-8a7.98 7.98 0 0 0-4.688 1.53c-.442-.277-.92-.51-1.406-.718A7.018 7.018 0 0 0 21 11c0-3.854-3.146-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5s-5-2.227-5-5s2.227-5 5-5zm10 12c3.326 0 6 2.674 6 6s-2.674 6-6 6s-6-2.674-6-6s2.674-6 6-6zm-1 2v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z"
            />
          </svg>
        </v-btn>
      </template>
    </v-data-table-server>
    <div class="btn-container">
      <v-btn class="create-btn">ADD New Table</v-btn>
    </div>
  </v-responsive>
</template>
<script>
import ApiCall from "../api/apiInterface";
export default {
  name: "Table",
  data() {
    return {
      tableRowStyle: "",
      page: 1,
      dialog: false,
      itemsPerPage: 10,
      tableInfo: [],
      selectedTable: null,
      formData: [],
      employees: [],
      AssignedEmployee: [],
      totalItems: 0,
      totalPages: 0,
      employees: [],
      headers: [
        {
          align: "start",
          key: "tableNumber",
          sortable: false,
          title: "Table Number",
        },
        { align: "start", title: "Number Of Seats", key: "numberOfSeats" },
        { align: "start", title: "Employee Name", key: "employeeAssign" },
        { align: "start", title: "Availability", key: "available" },
        { align: "start", title: "Add Employee", key: "action" },
      ],
    };
  },
  computed: {
    getEmployeeNames() {
      return this.employees.map((employee) => employee.name);
    },
  },
  methods: {
    async fetchTableInfo({ page, itemsPerPage, sortBy }) {
      try {
        this.page = page ??= this.page;
        this.itemsPerPage = itemsPerPage ??= this.itemsPerPage;
        this.sortBy = sortBy ??= this.sortBy;
        const response = await ApiCall.get(
          `api/Table/datatable?sort=${sortBy}&page=${page}&per_page=${itemsPerPage}`
        );
        this.tableInfo = response.data.data;
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.total;
      } catch (error) {
        console.log(error);
      }
    },
    selectTable(item) {
      this.selectedTable = item;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      // this.selectedTable = null;
    },
    save() {},
    async fetchEmployeeList() {
      try {
        const response = await ApiCall.get(`api/Employee/datatable`);
        this.employees = response.data.data;
        console.log(this.employees);

        console.log(this.employees.name);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchEmployeeList();
  },
};
</script>
<style scoped>
.table-page-container {
  min-height: 100vh;
  background-color: #f0f4f9;
}
.is-available-icon {
  color: green;
}
.btn-container {
  width: 90%;
  display: flex;
  justify-content: flex-end;
  margin: 20px auto auto auto;
}
.create-btn {
  color: rgb(26, 21, 13);
  background-color: #f99d52;
}
</style>