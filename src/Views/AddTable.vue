<template>
  <v-container>
    <v-form class="form-container">
      <v-row>
        <v-col cols="12" md="6">
          <v-col cols="12">
            <v-text-field
              v-model="tableInfo.tableNumber"
              :rules="nameRules"
              :counter="10"
              label="Table Number"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="tableInfo.numberOfSeats"
              :rules="nameRules"
              :counter="10"
              label="Number of Tables"
              type="number"
              required
            ></v-text-field>
          </v-col>
        </v-col>

        <v-col cols="12" md="6" class="img-section">
          <v-img
            class="bg-white ma-0"
            @click="onClickImage"
            :aspect-ratio="1"
            :src="tableInfo.base64 != null ? tableInfo.base64 : renderImage()"
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
  </v-container>
</template>
<script>
export default {
  name: "AddTable",
  data() {
    return {
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
      this.employeeInfo.image = selectedImage.name;
      // this.employeeInfo.image = URL.createObjectURL(selectedImage);
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("base 64 working", e.target.result);
        this.employeeInfo.base64 = e.target.result;
      };
      console.log(this.employeeInfo.base64);
      reader.readAsDataURL(fileObject);
    },
  },
};
</script>
<style scoped>
.form-container {
  border: 2px solid red;
}
.img-section {
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 150px;
  border: 2px solid green;
}
</style>