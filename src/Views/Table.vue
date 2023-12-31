<template>
  <section class="table-page-container">
    <v-container>
      <v-row class="mx-4 mt-2">
        <v-col class="header">
          <h4>Table List</h4>
          <v-btn
            class="create-btn"
            elevation="0"
            @click="$router.push('/admin/add-table')"
            >Add Table
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
          :items="tableList"
          :item-class="tableRowStyle"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="table border"
          @update:options="fetchTableInfo"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <div class="dialog-content-box">
                    <div class="dialog-img-box">
                      <v-img :src="renderImage(selectedTable.image)" />
                    </div>
                    <div class="dialog-text-box">
                      <div class="modal-text d-flex mt-5">
                        <p class="dialog-text-box-inner">
                          <span class="dialog-text-box-inner-bold"
                            >Table Number:</span
                          >
                          {{ selectedTable.tableNumber }}
                        </p>
                      </div>
                      <div class="modal-text d-flex mt-3">
                        <p class="dialog-text-box-inner">
                          <span class="dialog-text-box-inner-bold"
                            >Number of Seats:</span
                          >
                          {{ selectedTable.numberOfSeats }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <v-select
                    class="mt-3 dialog-text-box-inner"
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
                  <v-btn
                    class="dialog-text-box-inner"
                    color="blue-darken-1"
                    variant="text"
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    class="dialog-text-box-inner"
                    color="blue-darken-1"
                    variant="text"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.tableNumber="{ item }">
            <div class="table-inner-text">
              {{ item.raw.tableNumber }}
            </div>
          </template>
          <template v-slot:item.numberOfSeats="{ item }">
            <div class="table-inner-text">
              {{ item.raw.numberOfSeats }}
            </div>
          </template>
          <template v-slot:item.available="{ item }">
            <v-icon
              color="red"
              class="icon-margin-set"
              v-if="
                item.index == 4 ||
                item.index == 2 ||
                item.index == 7 ||
                item.isOccupied
              "
            >
              mdi-close-circle
            </v-icon>
            <v-icon class="icon-margin-set" v-else>mdi-check-circle</v-icon>
          </template>
          <template v-slot:item.addEmployee="{ item }">
            <v-btn
              class="icon-margin-set"
              elevation="0"
              rounded-circle
              @click="selectTable(item.raw)"
              icon="mdi-account-multiple-plus"
            >
              <v-icon size="large" color="#025464"
                >mdi-account-multiple-plus</v-icon
              >
            </v-btn>
          </template>
          <template v-slot:item.image="{ item }">
            <v-img width="40" height="40" :src="renderImage(item.raw.image)" />
          </template>
          <template v-slot:item.employees="{ item }">
            <div class="mt-1">
              <div v-if="item.raw.employees.length">
                <div
                  v-for="(employee, index) in item.raw.employees"
                  :key="index"
                >
                  <div class="chip">
                    <p>
                      {{ employee.name }}
                      <v-icon class="remove-name-icon" size="small" color="red"
                        >mdi-close-circle-outline</v-icon
                      >
                    </p>
                  </div>
                </div>
              </div>
              <div v-else class="not-assigned-text">N/A</div>
            </div>
          </template>
          <template v-slot:item.action="{ item }">
            <div class="d-flex">
              <v-btn
                class="ma-0 btn-hover d-block"
                elevation="0"
                rounded-circle
                icon="mdi-circle-edit-outline"
              >
                <span class="tooltip-text top">Edit</span>
                <v-icon color="green">mdi-circle-edit-outline</v-icon>
              </v-btn>
              <v-btn
                class="ma-0 btn-hover d-block"
                elevation="0"
                @click="deleteTable(item.raw.id)"
                rounded-circle
                icon="mdi-delete-outline"
              >
                <span class="tooltip-text top">Delete</span>
                <v-icon color="#e6683c">mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table-server>
      </div>
    </v-container>
  </section>
</template>
<script>
import ApiCall from "../api/apiInterface";
import Spinner from "../components/utils/Spinner.vue";
import { imageUrl } from "../constants/config";
export default {
  name: "Table",
  components: {
    Spinner,
  },
  data() {
    return {
      imageUrl: imageUrl,
      showSpinner: false,
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
      headers: [
        {
          align: "start",
          key: "image",
          sortable: false,
          title: "Table",
        },
        {
          align: "center",
          key: "tableNumber",
          sortable: false,
          title: "Table Number",
        },
        { align: "center", title: "Number Of Seats", key: "numberOfSeats" },
        { title: "Assigned Employees", key: "employees" },
        { title: "Availability", key: "available" },
        { title: "Add Employee", key: "addEmployee" },
        { align: "center", title: "Action", key: "action" },
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
      // if (image == "") {
      //   return new URL("../assets/image/employeeImg.jpg", import.meta.url).href;
      // } else {
      return this.imageUrl + "table/" + image;
      // }
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
        this.showSpinner = false;
      } catch (error) {
        console.log(error);
        this.showSpinner = false;
      }
    },
    async selectTable(item) {
      this.selectedTable = item;

      try {
        const response = await ApiCall.get(
          `api/employee/non-assigned-employees/${item.id}`
        );
        this.employeeList = response.data;
      } catch (e) {}
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async save() {
      try {
        const res = await ApiCall.post(
          "api/EmployeeTable/create-range",
          this.formData
        );
        console.log(res);
        await this.fetchEmployeeList({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          sortBy: this.sortBy,
        });
      } catch (e) {
        console.log(e);
      }
      this.dialog = false;
    },
    async deleteTable(id) {
      console.log(id);
      this.showSpinner = true;
      try {
        await ApiCall.delete(`api/Table/delete/${id}`);
        this.showSpinner = false;
        await this.fetchTableInfo({
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
  },
  mounted() {
    this.showSpinner = true;
    console.log(this.showSpinner);
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");

.table-page-container {
  min-height: 100vh;
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Noto Sans", sans-serif;

  font-size: clamp(1rem, 1.25rem, 2rem);
}
h4 {
  letter-spacing: 2px;
}
.table {
  max-width: 100%;
  overflow-x: hidden !important;
  white-space: nowrap !important;
  font-family: "Noto Sans", sans-serif;
  font-size: 16px;
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
.table-inner-text {
  font-size: 16px;
}
.not-assigned-text {
  opacity: 0.8;
  margin-left: 10px;
}
.chip {
  display: inline-block;
  padding: 0 15px;
  margin-bottom: 5px;
  height: 25px;
  font-size: 14px;
  line-height: 25px;
  border-radius: 25px;
  background-color: #dedbdb;
}
.icon-margin-set {
  display: inline-block;
  margin-left: 20px;
  color: green;
}
.remove-name-icon {
  cursor: pointer;
  border-radius: 50% !important;
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
  border: 3px solid #e6683c;
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
  background-color: #e6683c;
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
.tooltip-text {
  visibility: hidden;
  position: absolute;
  z-index: 1;
  width: 80px;
  color: white;
  font-size: 12px;
  background-color: #0e171fcd;
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
.dialog-content-box {
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0px !important; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.dialog-img-box {
  width: 80%;
}
.dialog-img-box img {
  width: 100%;
}
.dialog-text-box-inner {
  font-family: "Noto Sans", sans-serif;
}
.dialog-text-box-inner-bold {
  font-weight: 600;
}
@media screen and (min-width: 991px) {
  .dialog-content-box {
    flex-direction: row;
    gap: 20px;
  }
  .dialog-img-box {
    width: 50%;
  }
}
</style>