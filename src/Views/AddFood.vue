<template>
  <section class="add-food-container">
    <h1 class="pt-5 text-center">&bull; Add New Food &bull;</h1>
    <div class="underline mt-2 mb-10"></div>
    <v-form @submit.prevent="addFoodToDb" ref="form" class="ma-10">
      <v-row>
        <v-col cols="12" md="9" sm="12" xs="12">
          <v-row>
            <v-col
              cols="12"
              :md="foodInfo.discountType == 0 ? 4 : 8"
              sm="12"
              xs="12"
            >
              <v-text-field
                hide-details="auto"
                v-model="foodInfo.name"
                :rules="nameRules"
                label="Food Item Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
              <v-text-field
                hide-details="auto"
                v-model="foodInfo.price"
                :rules="nameRules"
                :counter="10"
                label="Price"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
              <v-select
                hide-details="auto"
                v-model="foodInfo.discountType"
                :items="discountTypes"
                :rules="nameRules"
                label="Discount Type"
                item-title="text"
                item-value="value"
                required
              ></v-select>
            </v-col>
            <v-col
              v-if="foodInfo.discountType != 0"
              cols="12"
              md="4"
              sm="12"
              xs="12"
            >
              <v-text-field
                hide-details="auto"
                v-model="foodInfo.discount"
                :rules="nameRules"
                :counter="10"
                type="number"
                label="Discount"
                required
                @update:modelValue="selectedDiscount"
              ></v-text-field>
            </v-col>
            <v-col
              v-if="foodInfo.discountType != 0"
              cols="12"
              md="4"
              sm="12"
              xs="12"
            >
              <v-text-field
                hide-details="auto"
                class="mb-8"
                v-model="foodInfo.discountPrice"
                :rules="nameRules"
                type="number"
                label="Discount Price"
                required
                @update:modelValue="selectedDiscountPrice"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-textarea
                v-model="foodInfo.description"
                :rules="nameRules"
                label="Food Description"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-img
            :class="isbase64Available ? 'bg-transparent' : 'input-img'"
            :aspect-ratio="1"
            @click="onClickImage"
            :src="foodInfo.base64 != null ? foodInfo.base64 : renderImage()"
          >
          </v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-file-input
            id="image"
            class="d-none"
            @change="handleImage"
            label="Select file"
            density="compact"
            variant="outlined"
          >
          </v-file-input>
        </v-col>
      </v-row>
      <div class="btn-container">
        <v-btn @click="submitForm" type="submit" size="large">Submit</v-btn>
      </div>
    </v-form>
  </section>
</template>
<script>
import ApiCall from "../api/apiInterface";

export default {
  name: "AddFood",
  data() {
    return {
      isbase64Available: false,
      showPseudoContent: true,
      discountTypes: [
        { text: "None", value: 0 },
        { text: "Flat", value: 1 },
        { text: "Percentage", value: 2 },
      ],
      foodInfo: {
        name: "",
        description: "",
        price: 0,
        discountType: 0,
        discount: 0,
        discountPrice: 0,
        image: "",
        base64: "",
      },
    };
  },
  watch: {
    "foodInfo.discountType"() {
      this.foodInfo.discount = 0;
      this.foodInfo.discountPrice = 0;
    },
  },

  methods: {
    selectedDiscount(value) {
      if (this.foodInfo.discountType === 1) {
        this.foodInfo.discountPrice = this.price - value;
        console.log(this.discountPrice);
      } else if (this.foodInfo.discountType === 2) {
        this.foodInfo.discountPrice = parseFloat(
          this.price - (value * price) / 100
        );
      } else {
        this.foodInfo.discountPrice = this.price;
      }
    },
    selectedDiscountPrice(value) {
      console.log(value);
    },
    renderImage() {
      return new URL("../assets/image/employeeImg.jpg", import.meta.url).href;
    },
    onClickImage() {
      document.getElementById("image").click();
    },
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.foodInfo.image = selectedImage.name;
      console.log("base64 working");
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.foodInfo.base64 = e.target.result;
      };
      console.log(this.foodInfo.base64);
      reader.readAsDataURL(fileObject);
      this.isbase64Available = true;
    },
    async addFoodToDb() {
      console.log(this.foodInfo);
      try {
        await ApiCall.post("api/food/create", this.foodInfo);
      } catch (e) {
        console.log(e);
      }
      this.$refs.form.reset();
    },
    submitForm() {
      this.foodInfo.base64 = "";
      this.isbase64Available = false;
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.add-food-container {
  min-height: 100vh;
  background-image: url("../assets/logo-images/cart_bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
h1 {
  white-space: wrap;
  color: #474544;
  overflow: hidden;
  font-size: clamp(0.73rem, -0.875rem + 8.333vw, 1.8rem);
  font-weight: 700;
  letter-spacing: 5px;
  text-align: center;
  text-transform: uppercase;
}
.underline {
  border-bottom: solid 2px #474544;
  margin: -0.512em auto;
  width: clamp(53px, 68px, 80px);
}
.input-img {
  background-color: #ccc;
  border-radius: 2px;
  flex-grow: 0;
  height: 200px;
  width: 200px;
}
.input-img::before {
  content: "Insert a image";
  font-size: clamp(0.6rem, -0.875rem + 8.333vw, 0.95rem);
  color: #7e7e7e;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.bg-transparent {
  border-radius: 2px;
  flex-grow: 0;
  background-color: transparent;
  height: 200px;
  width: 200px;
}
@media screen and (min-width: 768px) {
  .input-img {
    height: 350px;
    width: 350px;
  }
  .bg-transparent {
    height: 350px;
    width: 350px;
  }
}
.btn-container {
  display: flex;
  justify-content: center;
}
.btn-container button {
  text-transform: capitalize;
  background-color: #326383;
  color: #fff;
  width: 100px;
}
@media screen and (min-width: 768px) {
  .btn-container {
    justify-content: flex-start;
  }
  .btn-container button {
    width: auto;
  }
}
</style>