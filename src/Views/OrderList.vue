<template>
  <section class="order-container">
    <section class="order-section">
      <div class="menu_title text-center">
        <h1>Select A Table</h1>
      </div>
      <section class="table-section">
        <v-sheet class="mx-auto table-card-container my-4">
          <v-slide-group v-model="model" class="pa-0" show-arrows>
            <v-slide-group-item
              v-for="(table, i) in tableList"
              :key="i"
              v-slot="{ isSelected, toggle, selectedClass }"
            >
              <div class="table-info-container">
                <div class="text-center ma-0 pa-0">
                  <p class="mt-0 pt-2 font-weight-bold">
                    {{ table.tableNumber }}
                  </p>
                </div>
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
              </div>
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
              <v-row class="single_menu">
                <v-col cols="12" md="2" class="d-flex justify-center">
                  <img :src="renderFoodImage(food.image)" alt="burger" />
                </v-col>
                <v-col cols="12" md="10">
                  <div class="menu_content">
                    <div
                      class="menu_content_header d-flex justify-space-between mb-2"
                    >
                      <h4>
                        {{ food.name }}
                      </h4>
                      <h4 class="food-price">
                        {{
                          food.discountPrice > 0
                            ? food.discountPrice + " ৳"
                            : food.price + " ৳"
                        }}
                      </h4>
                    </div>

                    <p>
                      {{ truncateDescription(food.description) }}
                    </p>
                    <div class="d-flex">
                      <p
                        v-if="food.discount > 0"
                        class="discount-text mt-2"
                        style="background-color: #f05e4e"
                      >
                        Discount: <span>{{ food.discount }}</span>
                        {{
                          food.discountType.toLowerCase() == "flat" ? "৳" : "%"
                        }}
                      </p>
                      <p
                        v-if="food.discount > 0"
                        class="discount-text mt-2 ml-5"
                        style="background-color: #f0db3b; color: black"
                      >
                        Regular Price: <span>{{ food.price }} ৳</span>
                      </p>
                    </div>

                    <div class="btn-container mt-5">
                      <v-btn
                        :disabled="
                          model == null ||
                          selectedFoodItem.some(
                            (item) => item.food.id === food.id
                          )
                        "
                        elevation="0"
                        @click="addToCart(food)"
                        >Add To Cart</v-btn
                      >
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </section>

    <section class="cart-section d-flex justify-center">
      <div class="cart d-flex justify-center">
        <div class="cart-header d-flex justify-space-between border">
          <p class="d-block">Order</p>
          <v-icon class="d-block">mdi-cart-outline</v-icon>
        </div>
        <div class="cart-items-container">
          <div
            v-for="(cartItem, index) in selectedFoodItem"
            :key="index"
            class="d-flex cart-item justify-space-between pa-3"
          >
            <div
              class="d-flex justify-space-between align-center cart-item-left"
            >
              <v-img
                class="rounded-circle"
                :src="renderFoodImage(cartItem.food.image)"
                width="70"
                height="70"
              />
              <div class="cart-text ml-3">
                <h4 class="pb-2">{{ cartItem.food.name }}</h4>
                <div
                  class="cart-quantity border d-flex justify-space-between align-center"
                >
                  <div
                    class="cart-control-btn-minus px-1"
                    @click="decreaseQuantity(cartItem)"
                  >
                    <v-icon
                      class="d-inline-block icon"
                      icon="mdi-minus"
                    ></v-icon>
                  </div>
                  <div class="cart-quantity mx-2">{{ cartItem.quantity }}</div>
                  <div
                    class="cart-control-btn-plus px-1"
                    @click="increaseQuantity(cartItem)"
                  >
                    <v-icon
                      class="d-inline-block icon"
                      icon="mdi-plus"
                    ></v-icon>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-right ma-0">
              <v-icon
                class="delete-cart-icon"
                @click="removeFromCart(cartItem)"
              >
                mdi-delete-outline
              </v-icon>
              <div class="mt-2">
                <h4 style="color: #c94335">
                  {{ cartItem.food.price * cartItem.quantity }}৳
                </h4>
              </div>
            </div>
          </div>
          <div
            v-if="selectedFoodItem.length !== 0"
            class="cart-footer-container"
          >
            <div class="cart-footer-total d-flex justify-space-between pa-5">
              <h3>Total</h3>
              <h3>{{ calculateTotalPrice }} ৳</h3>
            </div>
            <div
              class="cart-footer-btn d-flex justify-center align-center pb-4 mx-5"
            >
              <v-btn
                :disabled="model == null"
                elevation="0"
                size="x-large"
                density="compact"
                >Checkout</v-btn
              >
            </div>
            <p v-if="model == null" class="danger-text text-center mb-2">
              Please Select a Table
            </p>
          </div>
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
      model: null,
      selectedFoodItem: [],
      imageUrl: imageUrl,
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 0,
      totalItems: 0,
      sortBy: "",
    };
  },
  computed: {
    calculateTotalPrice() {
      return this.selectedFoodItem.reduce(
        (total, item) => total + item.food.price * item.quantity,
        0
      );
    },
  },
  methods: {
    removeFromCart(item) {
      console.log(item);
      const foodIndex = this.selectedFoodItem.findIndex(
        (selectedItem) => selectedItem.food.id === item.food.id
      );
      if (foodIndex !== -1) {
        this.selectedFoodItem.splice(foodIndex, 1);
      }
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    addToCart(food) {
      console.log(food);
      const existingItem = this.selectedFoodItem.find(
        (item) => item.food.id === food.id
      );
      console.log(existingItem);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        if (food.discountPrice > 0) {
          food.price = food.discountPrice;
        } else {
          food.price = food.price;
        }
        this.selectedFoodItem.push({
          food: food,
          quantity: 1,
        });
      }
    },
    truncateDescription(description) {
      const maxLength = 300;
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
  display: flex;
  flex-direction: column;
}
@media screen and (min-width: 992px) {
  .order-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.2rem;
  }
}
.heading {
  color: #c0392b;
  font-size: 28px;
  font-weight: bolder;
  letter-spacing: 1px;
}
.table-section {
  min-height: 280px;
}
.table-info-container {
  background-color: #ccc;
  margin-right: 5px;
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
@media screen and (max-width: 393px) {
  .btn-container button {
    /* width: 100%; */
    font-size: 10px;
    padding: 5px 10px;
  }
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
  max-width: 1000px;
}
@media screen and (min-width: 992px) {
  .table-card-container {
    max-width: 815px;
  }
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
  display: flex;
  position: relative;
  margin-bottom: 75px;
}

.single_menu img {
  width: auto;
  height: 140px;

  transition: 0.3s;
  border-radius: 5px;
}

@media screen and (min-width: 992px) {
  .single_menu img {
    width: 100%;
  }
  .single_menu img {
    -webkit-clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    transition: 0.3s;
  }
  .single_menu:hover img {
    -webkit-clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
    clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
  }
}
.menu_content h4 {
  font-size: clamp(16px, -0.875rem + 8.333vw, 25px);
  font-weight: 600;
  line-height: 2;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
}
.menu_content_header {
  border-bottom: 2px dashed #c0392b;
}

.food-price {
  font-weight: 800 !important;
  font-style: italic;
  color: #c0392b;
}
.menu_content_header {
  border-bottom: 1px dashed #c0392b;
}
.menu_content p {
  font-weight: 200;
  font-size: clamp(12px, -0.875rem + 5.333vw, 16px);
  letter-spacing: 0.8px;
}
.discount-text {
  display: inline-block;
  /* font-size: 14px !important; */
  font-size: clamp(9px, 3vw, 14px) !important;
  letter-spacing: 0px !important;
  padding: 2px 8px;
  border-radius: 20px;
  color: white;
}
/* cart  */
.cart-section {
  height: fit-content;
}
.cart {
  width: 80%;
  margin: 20px auto;
  flex-direction: column;
}
.cart-items-container {
  border-left: 1px solid #bbbaba;
  border-right: 1px solid #bbbaba;
}
.cart-header {
  width: 100%;
  padding: 15px 25px;
  background-color: #e4e1e1;
}

.cart-item {
  flex-direction: row;
  border-bottom: 1px solid #ccc;
}

@media screen and (max-width: 300px) {
  .cart-item {
    flex-direction: column;
  }
  .cart-item-left {
    flex-direction: column;
  }
}

.cart-quantity {
  width: fit-content;
  cursor: pointer;
}
.cart-control-btn-minus {
  border-right: 1px solid #bbbaba;
}
.cart-control-btn-plus {
  border-left: 1px solid #bbbaba;
}
.delete-cart-icon {
  cursor: pointer;
  color: #484646;
}
.delete-cart-icon:hover {
  color: red;
}
.cart-footer-container {
  background-color: #f3f2f2;
  border-bottom: 1px solid #ccc;
}
.cart-footer-btn button {
  width: 100%;
  background-color: #c94335;
  font-size: 16px;
  border-radius: 0;
  color: white;
}
.danger-text {
  color: red;
}
</style>
