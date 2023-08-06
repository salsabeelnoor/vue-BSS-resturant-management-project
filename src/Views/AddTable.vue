<template>
  <div class="add-table-container">
    <div id="container">
      <h1>&bull; Add New Table &bull;</h1>
      <div class="underline mt-2"></div>
      <v-form ref="form" class="mt-4">
        <div class="img-box-container">
          <div class="text-box-container">
            <v-text-field
              class="my-4 text-box"
              v-model="tableInfo.tableNumber"
              :rules="nameRules"
              :counter="10"
              label="Table Number"
              required
            ></v-text-field>
            <v-text-field
              v-model="tableInfo.numberOfSeats"
              class="text-box"
              :rules="nameRules"
              :counter="10"
              label="Number of Seats"
              type="number"
              required
            ></v-text-field>
          </div>
          <v-img
            :class="isbase64Available ? 'bg-transparent' : 'input-img'"
            @click="onClickImage"
            :aspect-ratio="1"
            :src="tableInfo.base64 != null ? tableInfo.base64 : renderImage()"
          ></v-img>
        </div>
        <v-row>
          <v-col>
            <v-file-input
              id="image"
              class="d-none"
              @change="handleImage"
              label="Select file"
              density="compact"
              prepend-icon=""
            >
            </v-file-input>
          </v-col>
        </v-row>
        <div class="submit-btn-container">
          <v-btn @click="addTableToDb" class="add-table-btn" elevation="0">
            Submit
          </v-btn>
        </div>
      </v-form>
      <!-- // End form -->
    </div>
  </div>

  <!-- // End #container -->
</template>
<script>
import ApiCall from "../api/apiInterface";
export default {
  name: "AddTable",
  data() {
    return {
      showPseudoContent: true,
      isbase64Available: false,
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
      this.isbase64Available = true;
    },
    async addTableToDb() {
      // try {
      //   const response = await ApiCall.post("api/Table/create", this.tableInfo);
      // } catch (e) {
      //   console.log(e);
      // }
      this.$refs.form.reset();
      this.tableInfo.base64 = "";
      this.isbase64Available = false;
    },
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);

* {
  box-sizing: border-box;
}
.add-table-container {
  min-height: 100vh;
  background-image: url("../assets/logo-images/cart_bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-block: 60px;
}
#container {
  border: solid 3px #474544;
  max-width: 768px;
  padding: 10px;
  margin: auto;
  position: relative;
}
h1 {
  font-family: "Montserrat", Arial, sans-serif;
  color: #474544;
  font-size: clamp(0.96rem, -0.875rem + 8.333vw, 2rem);
  font-weight: 700;
  letter-spacing: 7px;
  text-align: center;
  text-transform: uppercase;
}

.underline {
  border-bottom: solid 2px #474544;
  margin: -0.512em auto;
  width: clamp(53px, 68px, 80px);
}

form {
  padding: 20px;
  margin: 40px 0;
}
.img-box-container {
  display: flex;
  flex-direction: column;
  height: auto;
}
@media screen and (min-width: 768px) {
  .img-box-container {
    flex-direction: row;
    justify-content: space-between;
    height: 200px;
  }
  .text-box-container {
    width: 50%;
  }
}
.text-box {
  background-color: white;
}

.input-img {
  background-color: #ccc;
  border-radius: 2px;
  flex-grow: 0;
  height: 180px;
  width: 250px;
}
.input-img::before {
  content: "Insert a image";
  color: #7e7e7e;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.bg-transparent {
  border-radius: 2px;
  flex-grow: 0;
  height: 180px;
  width: 250px;
  background-color: transparent;
}
.submit-btn-container {
  /* border: 2px solid red; */
  display: flex;
  justify-content: flex-start;
}
.add-table-btn {
  border: 2.5px solid #326383;
  /* transition: color 0.5s; */
  border-radius: 0px;
  margin-top: 20px;
  font-family: "Montserrat", Arial, sans-serif;
  color: black;
}
.add-table-btn:hover {
  color: #fff;
  background-color: #326383;
}
@media screen and (max-width: 768px) {
  #container {
    margin: 10px auto;
    width: 95%;
  }
}
</style>