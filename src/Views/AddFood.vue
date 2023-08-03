<template>
  <section class="add-food-container">
    <h2 class="mt-5 text-center">Foods</h2>
    <v-form
      @submit.prevent="addFoodToDb"
      ref="form"
      class="form-container ma-10"
    >
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
            class="img-section input-img pseudoClass"
            :aspect-ratio="1"
            @click="onClickImage"
            :src="foodInfo.base64 != null ? foodInfo.base64 : renderImage()"
          >
          </v-img>
        </v-col>
      </v-row>
      <v-row class="btn-container mt-10">
        <v-btn type="submit" size="large">Submit</v-btn>
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
    </v-form>
  </section>
</template>
<script>
import ApiCall from "../api/apiInterface";

export default {
  name: "AddFood",
  data() {
    return {
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

  methods: {
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
    },
    async addFoodToDb() {
      console.log(this.foodInfo);
      // try{
      //   await ApiCall.post('api/food/create', this.foodInfo)
      // }
      // catch(e){
      //   console.log(e)
      // }
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
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.form-container {
  /* border: 2px solid red; */
}

.input-img {
  background-color: #ccc;
  border-radius: 2px;
}
.pseudoClass::before {
  content: "Insert a image";
  color: #7e7e7e;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btn-container {
  display: flex;
  justify-content: center;
  /* border: 2px solid red; */
}
.btn-container button {
  background-color: rgb(225, 102, 39);
  transition: color 0.5s;
  width: 15%;
}
.btn-container button:hover {
  color: #fff;
}
</style>