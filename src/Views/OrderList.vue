<template>
  <section class="order-container">
    <section class="order-section">
      <div class="menu_title text-center">
        <h1>Select a Table</h1>
      </div>
      <section class="table-section">
        <v-sheet class="mx-auto table-card-container my-4" max-width="800">
          <v-slide-group v-model="model" class="pa-0" show-arrows>
            <v-slide-group-item
              v-for="(table, i) in tableList"
              :key="i"
              v-slot="{ isSelected, toggle, selectedClass }"
            >
              <v-img
                @click="toggle"
                height="200"
                width="200"
                :class="['ma-4', selectedClass]"
                :src="renderImage(table.image)"
              >
                <div
                  :class="[
                    'table-select',
                    'fill-height',
                    'align-center',
                    'justify-center',
                    isSelected ? 'transition-on-select' : '',
                  ]"
                >
                  <v-scale-transition>
                    <p
                      class="table-number-text mb-5"
                      color="#000"
                      v-if="isSelected"
                    >
                      {{ table.tableNumber }}
                    </p>
                  </v-scale-transition>
                  <v-scale-transition>
                    <v-icon
                      v-if="isSelected"
                      color="red"
                      size="30"
                      icon="mdi-close-circle-outline"
                    ></v-icon>
                  </v-scale-transition>
                </div>
              </v-img>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </section>
      <section class="food-section">
        <div class="menu_title text-center mb-4">
          <h1>Our Menu</h1>
        </div>
        <div class="single_line"></div>
        <v-container>
          <v-row>
            <v-col v-for="(food, i) in foodList" :key="i" cols="12">
              <div class="single_menu">
                <img :src="renderFoodImage(food.image)" alt="burger" />
                <div class="menu_content">
                  <h4>
                    {{ food.name }}<span> {{ food.price }} /=</span>
                  </h4>
                  <p>
                    {{ truncateDescription(food.description) }}
                  </p>
                  <div class="discount-section mt-1">
                    <div class="discount-text">
                      Discount: <span>{{ food.discount }}</span>
                    </div>
                    <div class="discount-text">
                      Discount Price: <span>{{ food.discountPrice }}</span>
                    </div>
                    <div class="discount-text">
                      Discount Type: <span>{{ food.discountType }}</span>
                    </div>
                  </div>
                  <div class="btn-container mt-5">
                    <v-btn elevation="0">Add To Cart</v-btn>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </section>
    <section class="cart-section d-flex justify-center">
      <div class="cart d-flex justify-center">
        <div class="cart-header d-flex justify-space-between">
          <p class="d-block">Order</p>
          <v-icon class="d-block">mdi-cart-outline</v-icon>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import ApiCall from "../api/apiInterface";
import { imageUrl } from "../constants/config";
export default {
  name: "OrderList",
  data() {
    return {
      foodList: [],
      tableList: [],
      model: [],
      imageUrl: imageUrl,
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 0,
      totalItems: 0,
      sortBy: "",
    };
  },
  methods: {
    truncateDescription(description) {
      const maxLength = 180;
      if (description.length > maxLength) {
        return description.substring(0, maxLength) + "...";
      }
      return description;
    },
    renderImage(image) {
      return this.imageUrl + "table/" + image;
    },
    renderFoodImage(image) {
      return this.imageUrl + "food/" + image;
    },
    async fetchTableList() {
      try {
        const response = await ApiCall.get(
          `api/Table/datatable?sort=${this.sortBy}&page=${this.currentPage}&per_page=${this.itemsPerPage}`
        );

        if (response.data.data.length === 0) {
          // Stop fetching if no more data
          return;
        }
        this.tableList = [...this.tableList, ...response.data.data];
        this.currentPage++;

        // Call the fetchData function recursively to fetch the next page
        await this.fetchTableList();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchFoodList() {
      try {
        const response = await ApiCall.get(
          `api/Food/datatable?sort=${this.sortBy}&page=${this.currentPage}&per_page=${this.itemsPerPage}`
        );

        if (response.data.data.length === 0) {
          // Stop fetching if no more data
          return;
        }
        this.foodList = [...this.foodList, ...response.data.data];
        this.currentPage++;
        console.log(this.foodList);
        // Call the fetchData function recursively to fetch the next page
        await this.fetchFoodList();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.fetchTableList();
    this.fetchFoodList();
  },
};
</script>

<style scoped>
.order-container {
  margin: 20px;
  display: grid;
  grid-template-columns: 2fr 0.8fr;
  gap: 1.2rem;
}
.heading {
  color: #c0392b;
  font-size: 28px;
  font-weight: bolder;
  letter-spacing: 1px;
}
.table-section {
  min-height: 280px;
  border: 2px solid white;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
}
.btn-container button {
  border-radius: 0;
  background-color: #c0392b;
  color: #fff;
}
.transition-on-select {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: rgba(8, 4, 0, 0.768);
}
.table-select {
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  width: 100%;
  flex-direction: column;
}
.table-number-text {
  font-weight: 600;
  letter-spacing: 5px;
  color: white !important;
}
.table-card-container {
  cursor: pointer;
}
/* Food */
.menu_title h1 {
  color: #c0392b;
  font-size: 34px;
  font-weight: 700;
  line-height: 2;
  margin-bottom: 0;
  position: relative;
  /* text-transform: capitalize; */
}
.menu_title h1::before {
  background: #c0392b;
  width: 70px;
  height: 2px;
  position: absolute;
  content: "";
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.menu_title h1::after {
  position: absolute;
  content: "";
  background: #fbc531;
  width: 30px;
  height: 2px;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.single_menu {
  position: relative;
  margin-bottom: 75px;
  transition: 0.3s;
}
.single_menu:hover img {
  -webkit-clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
  clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
}
.single_menu img {
  width: 20%;
  position: absolute;
  height: 140px;
  -webkit-clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
  transition: 0.3s;
  border-radius: 5px;
}
.menu_content {
  padding-left: 200px;
}
.menu_content h4 {
  font-size: 25px;
  font-weight: 300;
  border-bottom: 1px dashed #c0392b;
  line-height: 2;
  text-transform: capitalize;
}
.menu_content h4 span {
  font-size: 25px;
  font-weight: 800;
  float: right;
  font-style: italic;
  color: #c0392b;
}
.menu_content p {
  font-weight: 200;
  font-size: 16px;
  letter-spacing: 0.8px;
}
.discount-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.discount-text {
  font-size: 15px;
}
.cart-section {
  border: 2px solid teal;
  height: fit-content;
}
.cart {
  width: 80%;
  margin: 20px auto;
  border: 1px solid #cfcfcf;
}
.cart-header {
  padding: 15px 25px;
  border: 2px solid red;
}
</style>
