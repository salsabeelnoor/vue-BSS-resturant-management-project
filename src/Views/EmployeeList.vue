<template>
  <section class="list-view-container">
    <v-container>
      <v-row class="mx-4 mt-2">
        <v-col class="header">
          <h4>Employee List</h4>
          <v-btn
            class="create-btn"
            elevation="0"
            @click="$router.push('/admin/add-employee')"
            >Add Employee
          </v-btn>
        </v-col>
      </v-row>
      <div class="table-container">
        <div class="spinner-container">
          <Spinner v-if="showSpinner" class="spinner" />
        </div>
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items-length="totalItems"
          :items="employees"
          class="border"
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
          <template v-slot:item.image="{ item }">
            <v-img width="35" fab :src="renderImage(item.raw.user.image)" />
          </template>
        </v-data-table-server>
      </div>
      <p class="ma-3 text-red text-center" v-if="errorMessage">
        {{ this.errorMessage }}
      </p>
    </v-container>
  </section>
</template>
<script>
import apiCall from "../api/apiInterface";
import Spinner from "../components/utils/Spinner.vue";
import { imageUrl } from "../constants/config";
export default {
  name: "EmployeeList",
  components: {
    Spinner,
  },
  data() {
    return {
      imageUrl: imageUrl,
      showSpinner: false,
      errorMessage: "",
      dialogDelete: false,
      page: 1,
      headers: [
        {
          align: "start",
          key: "image",
          sortable: false,
          title: "Image",
        },
        {
          key: "user.fullName",
          sortable: false,
          title: "Employee",
        },
        {
          key: "user.email",
          sortable: false,
          title: "Email",
        },
        {
          key: "user.phoneNumber",
          sortable: false,
          title: "Phone",
        },
        {
          key: "user.dob",
          sortable: false,
          title: "Date of Birth",
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
    renderImage(image) {
      if (image == "") {
        return new URL("../assets/image/employeeImg.jpg", import.meta.url).href;
      } else {
        return this.imageUrl + "user/" + image;
      }
    },
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
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: clamp(1rem, 1.25rem, 2rem);
}
h4 {
  letter-spacing: 2px;
}
.create-btn {
  margin-bottom: 15px;
  letter-spacing: 0;
  border-radius: 0;
  color: #222;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid #cc2366;
  background-color: transparent;
}
@media (max-width: 767px) {
  .create-btn {
    width: 150px;
    margin: 15px auto;
  }
  .header {
    text-align: center;
  }
}
.create-btn:hover {
  background-color: #cc2366;
  color: white;
}
@media (min-width: 768px) {
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 24px;
  }
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