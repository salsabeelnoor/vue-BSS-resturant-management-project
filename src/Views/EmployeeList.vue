<template>
  <section class="list-view-container">
    <v-container>
      <v-row>
        <v-col>Employee List</v-col>

        <v-col class="d-flex justify-end">
          <v-btn
            class="create-btn rounded-pill"
            elevation="1"
            @click="$router.push('/admin/add-employee')"
            >Create New
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div class="table-container">
      <div class="spinner-container">
        <Spinner v-if="showSpinner" class="spinner" />
      </div>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="employees"
        class="elevation-1"
        item-value="name"
        @update:options="fetchEmployeeList"
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            @click="deleteEmployee(item.raw.id)"
            class="text-capitalize"
            elevation="0"
            fab
            small
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z"
              />
            </svg>
          </v-btn>
        </template>
      </v-data-table-server>
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
        { title: "Joining Date", key: "joinDate" },
        { title: "Designation", key: "designation" },
        { title: "Action", key: "action" },
      ],
      employees: [],
      itemsPerPage: 10,
      totalPages: 0,
      totalItems: 0,
      editedIndex: -1,
      sortBy: "",
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
  computed: {},
  methods: {
    tableRowStyle() {
      return "table-row-style";
    },
    async fetchEmployeeList({ page, itemsPerPage, sortBy }) {
      this.page = page ??= this.page;
      this.itemsPerPage = itemsPerPage ??= this.itemsPerPage;
      this.sortBy = sortBy ??= this.sortBy;
      try {
        const response = await apiCall.get(
          `api/Employee/datatable?sort=${sortBy}&page=${page}&per_page=${itemsPerPage}`
        );
        this.employees = response.data.data;
        this.totalPages = response.data.totalPages;
        this.totalItems = response.data.total;
        this.showSpinner = false;
      } catch (error) {
        this.showSpinner = false;
      }
    },
    async deleteEmployee(id) {
      console.log(id);
      this.showSpinner = true;
      try {
        await apiCall.delete(`api/Employee/delete/${id}`);
        this.showSpinner = false;
        await this.fetchEmployeeList({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          sortBy: this.sortBy,
        });
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
  },
  mounted() {
    this.showSpinner = true;
  },
};
</script>
<style scoped>
.list-view-container {
  min-height: 100vh;
  /* background-color: #faf3dc; */
}

.create-btn {
  background-color: transparent;
  border: 2px solid rgb(225, 102, 39);
  transition: all 1s;
}

.create-btn:hover {
  background-color: rgb(225, 102, 39);
  color: #fff;
}

.table-container {
  position: relative;
  width: 100%;
}

.spinner-container {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
}

.delete-btn {
  color: #312525;
  border: 2px solid rgb(225, 102, 39);
  transition: all 0.5s;
}

.delete-btn:hover {
  background-color: rgb(161, 48, 4);
  color: #fff;
}

.table {
  width: 75%;
  margin: auto;
}

.tableRowStyle {
  background-color: red;
}

.table tbody {
  background-color: #917d3c !important;
}
</style>