<template>
  <section class="order-container">
    <section class="order-section">
      <section class="table-section">
        <p class="heading text-center my-5">Select Your Choice of Table</p>
        <v-sheet
          class="mx-auto table-card-container"
          min-height="280"
          max-width="800"
        >
          <v-slide-group
            v-model="model"
            class="pa-0"
            selected-class="bg-primary"
            multiple
            show-arrows
          >
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
        <h2>This is food section</h2>
      </section>
    </section>
    <section class="cart-section">
      <h2>This is cart section</h2>
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
    renderImage(image) {
      return this.imageUrl + "table/" + image;
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
        console.log(this.tableList);

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
  grid-template-columns: 2fr 1fr;
  gap: 1.2rem;
}
.heading {
  color: #e6683c;
  font-size: 28px;
  font-weight: bolder;
  letter-spacing: 2px;
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
.cart-section {
  border: 2px solid teal;
}
</style>
