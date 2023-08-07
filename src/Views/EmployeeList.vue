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
        <div class="d-flex justify-center">
          <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items-length="totalItems"
            :items="employees"
            class="border myTable"
            item-value="name"
            @update:options="fetchEmployeeList"
          >
            <!-- <template v-slot:header="{ props: { headers } }">
            <thead>
              <tr>
                <th v-for="(h, i) in headers" :key="i" :class="h.class">
                  <span>{{ h.title }}</span>
                </th>
              </tr>
            </thead>
          </template> -->
            <template v-slot:item.action="{ item }">
              <div class="d-flex">
                <v-btn
                  class="ma-0 text-capitalize btn-hover d-block"
                  elevation="0"
                  rounded-circle
                  icon="mdi-circle-edit-outline"
                >
                  <span class="tooltip-text top">Edit</span>
                  <v-icon color="green">mdi-circle-edit-outline</v-icon>
                </v-btn>
                <v-btn
                  @click="deleteEmployee(item.raw.id)"
                  class="ma-0 text-capitalize btn-hover d-block"
                  elevation="0"
                  rounded-circle
                  icon="mdi-delete-outline"
                >
                  <span class="tooltip-text top">Delete</span>
                  <v-icon color="red">mdi-delete-outline</v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:item.image="{ item }">
              <v-img width="35" fab :src="renderImage(item.raw.user.image)" />
            </template>
            <template v-slot:item.fullName="{ item }">
              <div class="name-container">
                <p class="d-block nameTruncate btn-hover">
                  {{ item.raw.user.fullName }}
                </p>
                <span class="tooltip-text top">
                  {{ item.raw.user.fullName }}
                </span>
                <v-icon
                  @click="toggleColor"
                  :color="isOrange ? 'orange' : '#b5adac'"
                  >mdi-star</v-icon
                >
              </div>
            </template>
            <template v-slot:item.email="{ item }">
              <p class="d-block emailTruncate">{{ item.raw.user.email }}</p>
            </template>
            <template v-slot:item.phoneNumber="{ item }">
              <p class="d-block emailTruncate">{{ item.raw.user.email }}</p>
            </template>
            <template v-slot:item.dob="{ item }">
              <p class="d-block emailTruncate">{{ item.raw.user.email }}</p>
            </template>
          </v-data-table-server>
        </div>
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
      isOrange: true,
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
          class: "my-header-style",
        },
        {
          key: "fullName",
          sortable: false,
          title: "Name",
          class: "my-header-style",
        },
        {
          key: "email",
          sortable: false,
          title: "Email",
          class: "my-header-style",
        },
        {
          key: "phoneNumber",
          sortable: false,
          title: "Phone",
          class: "my-header-style",
        },
        {
          key: "dob",
          sortable: false,
          title: "Date of Birth",
          class: "my-header-style",
        },
        { title: "Joining Date", key: "joinDate", class: "my-header-style" },
        { title: "Designation", key: "designation", class: "my-header-style" },
        {
          align: "center",
          title: "Action",
          key: "action",
          class: "my-header-style",
        },
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
    styleElements() {
      const tRows = document.getElementsByTagName("tr");
      for (const tRow of tRows) {
        tRow.style.color = "blue";
        tRow.style.fontSize = "20px";
        // Apply any other styles you want here
      }
    },
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
        console.log(this.employees);
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
    toggleColor() {
      this.isOrange = !this.isOrange;
    },
  },
  mounted() {
    // styleElements();
    this.showSpinner = true;
  },
};
</script>
<style>
th,
td {
  min-width: 20px !important;
}
table {
  background: red !important;
}
</style>
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
.name-container {
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  cursor: pointer;
}

.tooltip-text {
  visibility: hidden;
  position: absolute;
  z-index: 1;
  width: 80px;
  color: white;
  font-size: 12px;
  background-color: #192733bc;
  border-radius: 10px;
  padding: 5px;
}
.tooltip-text::after {
  content: "";
  position: absolute;
  margin-left: 25px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.btn-hover:hover .tooltip-text {
  visibility: visible;
  font-family: "Times New Roman", Times, serif;
  font-size: 12px;
}

.top {
  top: -40px;
  left: -50%;
}

.top::after {
  top: 100%;
  left: 15%;
}

.table-container {
  position: relative;
  width: 100%;
}

/* table {
  color: red;
} */
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
.v-data-table .v-data-table__wrapper {
  overflow-x: hidden !important;
}
.myTable {
  max-width: 100%;
  overflow-x: hidden !important;
  white-space: nowrap !important;
  font-family: "Times New Roman", Times, serif;
  font-size: 17px;
}
.nameTruncate {
  min-width: 0px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.emailTruncate {
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.myTable > thead > tr > th {
  color: red !important;
}

.my-header-style {
  color: red !important;
}

.tableRowStyle {
  background-color: red;
}

.table tbody {
  background-color: #917d3c !important;
}
</style>