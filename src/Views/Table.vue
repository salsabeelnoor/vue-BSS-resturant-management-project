<template>
  <v-responsive class="table-page-container">
    <v-container>
      <div class="header-container d-flex justify-space-between pt-5">
        <h2>Table Information</h2>
      </div>
    </v-container>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="tableList"
      :item-class="tableRowStyle"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="table"
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
              <div class="modal-text d-flex mt-5">
                <h3>Table Number: {{ selectedTable.tableNumber }}</h3>
              </div>
              <div class="modal-text d-flex mt-3">
                <h3>Number of Seats: {{ selectedTable.numberOfSeats }}</h3>
              </div>
              <v-select
                class="mt-3"
                v-model="selectedEmployees"
                :items="employeeList"
                label="Items"
                item-title="name"
                item-value="employeeId"
                chips
                multiple
              ></v-select>
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
        <svg
          v-if="item.isOccupied"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <path
            fill="#45413c"
            d="M9.76 45.14a14.24 1.86 0 1 0 28.48 0a14.24 1.86 0 1 0-28.48 0Z"
            opacity=".15"
          />
          <path
            fill="#ff6242"
            d="m40.06 12.76l-4.82-4.82a1.24 1.24 0 0 0-1.75 0L24 17.43l-9.49-9.49a1.24 1.24 0 0 0-1.75 0l-4.82 4.82a1.24 1.24 0 0 0 0 1.75L17.43 24l-9.49 9.49a1.24 1.24 0 0 0 0 1.75l4.82 4.82a1.24 1.24 0 0 0 1.75 0L24 30.57l9.49 9.49a1.24 1.24 0 0 0 1.75 0l4.82-4.82a1.24 1.24 0 0 0 0-1.75L30.57 24l9.49-9.49a1.24 1.24 0 0 0 0-1.75Z"
          />
          <path
            fill="#ff866e"
            d="m9 15.6l3.73-3.73a1.23 1.23 0 0 1 1.75 0L24 21.35l9.49-9.48a1.23 1.23 0 0 1 1.75 0L39 15.6l1.09-1.09a1.24 1.24 0 0 0 0-1.75l-4.85-4.82a1.24 1.24 0 0 0-1.75 0L24 17.43l-9.49-9.49a1.24 1.24 0 0 0-1.75 0l-4.82 4.82a1.24 1.24 0 0 0 0 1.75Z"
          />
          <path
            fill="none"
            stroke="#45413c"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m40.06 12.76l-4.82-4.82a1.24 1.24 0 0 0-1.75 0L24 17.43l-9.49-9.49a1.24 1.24 0 0 0-1.75 0l-4.82 4.82a1.24 1.24 0 0 0 0 1.75L17.43 24l-9.49 9.49a1.24 1.24 0 0 0 0 1.75l4.82 4.82a1.24 1.24 0 0 0 1.75 0L24 30.57l9.49 9.49a1.24 1.24 0 0 0 1.75 0l4.82-4.82a1.24 1.24 0 0 0 0-1.75L30.57 24l9.49-9.49a1.24 1.24 0 0 0 0-1.75Z"
          />
        </svg>
        <svg
          v-else
          class="is-available-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fill="#008000"
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
      <template v-slot:item.image="{ item }">
        <v-img width="45" height="45" :src="renderImage(item.raw.image)" />
      </template>
      <template v-slot:item.employees="{ item }">
        <ul>
          <li v-for="(employee, index) in item.raw.employees">
            {{ employee.name }}
          </li>
        </ul>
      </template>
    </v-data-table-server>
    <div class="btn-container">
      <v-btn class="create-btn">ADD New Table</v-btn>
    </div>
  </v-responsive>
</template>
<script>
import ApiCall from "../api/apiInterface";
import { imageUrl } from "../constants/config";
export default {
  name: "Table",
  data() {
    return {
      imageUrl: imageUrl,
      selectedEmployees: [],
      tableRowStyle: "",
      itemsPerPage: 10,
      totalPages: 0,
      totalItems: 0,
      sortBy: "",
      dialog: false,
      tableList: [],
      selectedTable: null,
      employeeList: [],
      selectedEmployeeId: [],
      formData: [],
      employees: [],
      AssignedEmployee: [],
      employees: [],
      headers: [
        {
          align: "start",
          key: "image",
          sortable: false,
          title: "Table",
        },
        {
          key: "tableNumber",
          sortable: false,
          title: "Table Number",
        },
        { title: "Number Of Seats", key: "numberOfSeats" },
        { title: "Assigned Employees", key: "employees" },
        { title: "Availability", key: "available" },
        { title: "Add Employee", key: "action" },
      ],
    };
  },
  watch: {
    selectedEmployees: {
      deep: true,
      handler(value) {
        this.formData = [];
        value.forEach((employeeId) => {
          this.formData.push({
            employeeId: employeeId,
            tableId: this.selectedTable.id,
          });
        });
        console.log(this.formData);
      },
    },
  },
  methods: {
    renderImage(image) {
      if (image == "") {
        return new URL("../assets/image/employeeImg.jpg", import.meta.url).href;
      } else {
        return this.imageUrl + "table/" + image;
      }
    },
    async fetchTableInfo({ page, itemsPerPage, sortBy }) {
      try {
        this.page = page ??= this.page;
        this.itemsPerPage = itemsPerPage ??= this.itemsPerPage;
        this.sortBy = sortBy ??= this.sortBy;
        const response = await ApiCall.get(
          `api/Table/datatable?sort=${sortBy}&page=${page}&per_page=${itemsPerPage}`
        );
        this.tableList = response.data.data;
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
    async save() {
      try {
        await ApiCall.post("api/EmployeeTable/create-range", this.formData);
        await this.fetchEmployeeList({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          sortBy: this.sortBy,
        });
      } catch (e) {
        console.log(e);
      }
    },
    async fetchEmployeeList() {
      try {
        const response = await ApiCall.get(`api/Employee/get`);
        this.employeeList = response.data;
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
  width: 25px;
  color: #008000;
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