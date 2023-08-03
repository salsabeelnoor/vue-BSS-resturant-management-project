<template>
  <div class="add-table-container">
    <v-container class="">
      <h2 class="text-center mb-10">Add A New Table</h2>
      <div class="form-container">
        <v-form class="ma-10" ref="form">
          <v-row>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    class="mb-8"
                    v-model="tableInfo.tableNumber"
                    :rules="nameRules"
                    :counter="10"
                    label="Table Number"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="tableInfo.numberOfSeats"
                    :rules="nameRules"
                    :counter="10"
                    label="Number of Seats"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="submit-btn-container">
                <v-btn
                  @click="addTableToDb"
                  class="add-table-btn rounded-pill"
                  elevation="0"
                >
                  Submit
                </v-btn>
              </v-row>
            </v-col>

            <v-col cols="12" md="6" class="img-section">
              <v-img
                :class="[
                  'mx-10',
                  'input-img',
                  { pseudoClass: showPseudoContent },
                ]"
                @click="onClickImage"
                :aspect-ratio="1"
                :src="
                  tableInfo.base64 != null ? tableInfo.base64 : renderImage()
                "
              ></v-img>
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
                prepend-icon=""
              >
              </v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-container>
  </div>
</template>
<script>
import ApiCall from "../api/apiInterface";
export default {
  name: "AddTable",
  data() {
    return {
      showPseudoContent: true,
      tableInfo: {
        tableNumber: "",
        numberOfSeats: 0,
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
      this.tableInfo.image = selectedImage.name;
      // this.employeeInfo.image = URL.createObjectURL(selectedImage);
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("base 64 working", e.target.result);
        this.tableInfo.base64 = e.target.result;
      };
      console.log(this.tableInfo.base64);
      reader.readAsDataURL(fileObject);
      this.showPseudoContent = false;
    },
    async addTableToDb() {
      console.log(this.tableInfo);
      try {
        const response = await ApiCall.post("api/Table/create", this.tableInfo);
      } catch (e) {
        console.log(e);
      }
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.add-table-container {
  min-height: 100vh;
  background-image: url("../assets/logo-images/cart_bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container {
  border-top: 2.5px solid rgb(218, 72, 5);
  border-bottom: 2.5px solid rgb(218, 72, 5);
}
.img-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-img {
  background-color: #ccc;
  border-radius: 2px;
  height: 450px;
  width: 150px;
}
.pseudoClass::before {
  content: "Insert a image";
  color: #7e7e7e;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.submit-btn-container {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.add-table-btn {
  background-color: rgb(225, 102, 39);
  transition: color 0.5s;
  margin-top: 10px;
  width: 15%;
  padding: 10px;
}
.add-table-btn:hover {
  color: #fff;
}
</style>