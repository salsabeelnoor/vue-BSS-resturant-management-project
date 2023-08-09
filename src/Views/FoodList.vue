<template>
  <section class="list-view-container">
    <v-row class="mx-4 mt-2">
      <v-col class="header">
        <h4>Food List</h4>
        <v-btn
          class="create-btn"
          elevation="0"
          @click="$router.push('/admin/add-food')"
          >Add Food
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
          :items="foodList"
          class="border myTable"
          item-value="name"
          @update:options="fetchFoodList"
        >
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
                rounded-circle
                icon="mdi-delete-outline"
              >
                <span class="tooltip-text top">Delete</span>
                <v-icon color="#e6683c">mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:item.image="{ item }">
            <v-img
              width="40"
              height="40"
              class="rounded-circle"
              fab
              :src="renderImage(item.raw.image)"
            />
          </template>
        </v-data-table-server>
      </div>
    </div>
    <p class="ma-3 text-red text-center" v-if="errorMessage">
      {{ this.errorMessage }}
    </p>
  </section>
</template>
<script>
import apiCall from "../api/apiInterface";
import Spinner from "../components/utils/Spinner.vue";
import { imageUrl } from "../constants/config";
export default {
  name: "FoodList",
  components: {
    Spinner,
  },
  data() {
    return {
      headers: [
        {
          align: "start",
          key: "image",
          sortable: false,
          title: "Image",
        },
        {
          align: "start",
          key: "name",
          sortable: false,
          title: "Name",
        },
        { title: "Price", key: "price" },
        { title: "Discount Type", key: "discountType" },
        { title: "Discount", key: "discount" },
        { title: "Discount Price", key: "discountPrice" },
        { align: "center", title: "Action", key: "action", width: "120px" },
      ],
      foodList: [],
      itemsPerPage: 10,
      totalPages: 0,
      totalItems: 0,
      page: 1,
      editedIndex: -1,
      sortBy: "",
      imageUrl: imageUrl,
    };
  },
  methods: {
    renderImage(image) {
      return this.imageUrl + "food/" + image;
    },
    async fetchFoodList({ page, itemsPerPage, sortBy }) {
      this.page = page ??= this.page;
      this.itemsPerPage = itemsPerPage ??= this.itemsPerPage;
      this.sortBy = sortBy ??= this.sortBy;
      try {
        const response = await apiCall.get(
          `api/Food/datatable?sort=${sortBy}&page=${page}&per_page=${itemsPerPage}`
        );
        this.foodList = response.data.data;
        console.log(this.foodList);
        // this.totalPages = response.data.totalPages;
        // this.totalItems = response.data.total;
        this.showSpinner = false;
      } catch (error) {
        this.showSpinner = false;
      }
    },
  },
};
</script>
<style scoped>
.list-view-container {
  margin: 30px;
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
</style>