<template>
  <section class="add-food-container">
    <h1 class="pt-5 text-center">&bull; Add New Food &bull;</h1>
    <div class="underline mt-2 mb-10"></div>
    <div class="spinner-container">
      <Spinner v-if="showSpinner" class="spinner" />
    </div>
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
                class="text-field"
                v-model="foodInfo.name"
                :rules="nameRules"
                label="Food Item Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
              <v-text-field
                class="text-field"
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
                class="text-field"
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
                class="text-field"
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
                class="mb-8 text-field"
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
                class="text-field"
                v-model="foodInfo.description"
                :rules="nameRules"
                label="Food Description"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3" sm="12" xs="12" class="img-container">
          <v-img
            :class="isbase64Available ? 'bg-transparent ' : 'input-img'"
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
        <v-btn type="submit" size="large" elevation="0">Submit</v-btn>
      </div>
    </v-form>
  </section>
</template>
<script>
import ApiCall from "../api/apiInterface";
import Spinner from "../components/utils/Spinner.vue";
export default {
  name: "AddFood",
  components: {
    Spinner,
  },
  data() {
    return {
      showSpinner: false,
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
        price: parseInt(0),
        discountType: 0,
        discount: parseInt(0),
        discountPrice: parseInt(0),
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
        this.foodInfo.discountPrice = this.foodInfo.price - value;
        console.log(this.discountPrice);
      } else if (this.foodInfo.discountType === 2) {
        this.foodInfo.discountPrice =
          this.foodInfo.price - (this.foodInfo.price * value) / 100;
      }
      // else {
      //   this.foodInfo.discountPrice = this.foodInfo.price;
      // }
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
      this.showSpinner = true;
      try {
        await ApiCall.post("api/food/create", this.foodInfo);
        this.showSpinner = false;
      } catch (e) {
        this.showSpinner = false;

        console.log(e);
      }
      this.foodInfo.base64 = "";
      this.isbase64Available = false;
      this.$refs.form.reset();
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
  font-family: "Montserrat", Arial, sans-serif;
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
.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.text-field {
  background-color: white;
}
.img-container {
  display: flex;
  justify-content: center;
}
.img-container img {
  width: 100%;
}
@media screen and (min-width: 540px) and (max-width: 912px) {
  .img-container {
    display: flex;
    justify-content: flex-start;
  }
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
  font-size: clamp(10px, 12px, 16px);
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
@media screen and (min-width: 992px) {
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
  background-color: #e6683c;
  color: white;
  border-radius: 0;
  letter-spacing: 0;
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